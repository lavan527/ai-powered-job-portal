import { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, AlertCircle, Lightbulb, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ResumeUpload } from '../components/ResumeUpload';
import { JobMatchCard } from '../components/JobMatchCard';
import { useAuth } from '../context/AuthContext';
import { readResumeFile, parseResumeText, calculateJobMatches } from '../utils/resumeParser';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

type AnalysisState = 'idle' | 'loading' | 'success' | 'error';

interface JobMatch {
  job: any;
  matchPercentage: number;
  matchedSkills: string[];
  matchReason: string;
}

export function ResumeMatchPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [analyzedSkills, setAnalyzedSkills] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]); // ✅ backend jobs

  // ✅ FETCH JOBS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:8081/api/jobs")
      .then(res => res.json())
      .then(data => {
        console.log("AI JOBS:", data);
        setJobs(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
    setAnalysisState('idle');
    setMatches([]);
    setAnalyzedSkills([]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError('');
    setAnalysisState('idle');
    setMatches([]);
    setAnalyzedSkills([]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please upload a resume first');
      return;
    }

    setAnalysisState('loading');
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 📄 Read Resume
      const resumeText = await readResumeFile(selectedFile);

      // 🧠 Extract Skills
      const parsedResume = parseResumeText(resumeText);

      if (parsedResume.skills.length === 0) {
        setError('No skills found in resume');
        setAnalysisState('error');
        return;
      }

      // 🤖 MATCH WITH BACKEND JOBS (IMPORTANT)
      const jobMatches = calculateJobMatches(parsedResume, jobs);

      if (jobMatches.length === 0) {
        setError('No matching jobs found');
        setAnalysisState('error');
        return;
      }

      // 🔥 Sort by best match
      jobMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

      setMatches(jobMatches);
      setAnalyzedSkills(parsedResume.skills);
      setAnalysisState('success');

      toast.success('AI Match Completed!');
    } catch (err) {
      console.error(err);
      setError('Analysis failed');
      setAnalysisState('error');
      toast.error('Something went wrong');
    }
  };

  const handleApply = (jobId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role === 'recruiter') {
      toast.error('Recruiters cannot apply');
      return;
    }
    toast.success('Applied successfully!');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Resume Matcher</h1>
          <p className="text-secondary">
            Upload your resume and get best job matches instantly
          </p>
        </div>

        {/* UPLOAD */}
        <div className="bg-white p-6 rounded-xl mb-6">
          <ResumeUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onRemove={handleRemoveFile}
          />
        </div>

        {/* BUTTON */}
        {selectedFile && (
          <Button
            onClick={handleAnalyze}
            disabled={analysisState === 'loading'}
            className="w-full mb-6"
          >
            {analysisState === 'loading' ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2" />
                Analyze Resume
              </>
            )}
          </Button>
        )}

        {/* ERROR */}
        {analysisState === 'error' && (
          <div className="text-red-500 mb-6">{error}</div>
        )}

        {/* SUCCESS */}
        {analysisState === 'success' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Detected Skills</h2>
              <div className="flex flex-wrap gap-2">
                {analyzedSkills.map((skill) => (
                  <span key={skill} className="bg-gray-200 px-3 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Top Matches</h2>
              {matches.map((match) => (
                <JobMatchCard
                  key={match.job.id}
                  job={match.job}
                  matchPercentage={match.matchPercentage}
                  matchedSkills={match.matchedSkills}
                  matchReason={match.matchReason}
                  onApply={() => handleApply(match.job.id)}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}