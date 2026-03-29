import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2, AlertCircle, Lightbulb, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ResumeUpload } from '../components/ResumeUpload';
import { JobMatchCard } from '../components/JobMatchCard';
import { useAuth } from '../context/AuthContext';
import { mockJobs } from '../data/jobs';
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
      // Simulate processing time for realistic UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Read and parse resume
      const resumeText = await readResumeFile(selectedFile);
      const parsedResume = parseResumeText(resumeText);

      if (parsedResume.skills.length === 0) {
        setError('No matching skills found in your resume. Please make sure your resume includes your technical skills.');
        setAnalysisState('error');
        return;
      }

      // Calculate job matches
      const jobMatches = calculateJobMatches(parsedResume, mockJobs);

      if (jobMatches.length === 0) {
        setError('No matching jobs found. Try uploading a resume with more detailed skills and experience.');
        setAnalysisState('error');
        return;
      }

      setMatches(jobMatches);
      setAnalyzedSkills(parsedResume.skills);
      setAnalysisState('success');
      toast.success('Resume analyzed successfully!');
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      setAnalysisState('error');
      toast.error('Analysis failed');
    }
  };

  const handleApply = (jobId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    if (user?.role === 'recruiter') {
      toast.error('Recruiters cannot apply to jobs');
      return;
    }
    toast.success('Application submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Matching</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Find Jobs Using Your Resume
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Upload your resume and get AI-powered job recommendations based on your skills and experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Step 1: Upload Your Resume
              </h2>
              <ResumeUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemove={handleRemoveFile}
              />
            </div>

            {/* Action Section */}
            {selectedFile && (
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Step 2: Analyze & Match
                </h2>
                <Button
                  onClick={handleAnalyze}
                  disabled={analysisState === 'loading'}
                  size="lg"
                  className="w-full"
                >
                  {analysisState === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analyze Resume & Find Jobs
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Analysis Summary */}
            {analysisState === 'success' && analyzedSkills.length > 0 && (
              <div className="bg-gradient-to-br from-primary/5 to-accent/30 rounded-xl border border-primary/20 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">Resume Analysis Complete</h3>
                    <p className="text-sm text-secondary mb-3">
                      Found {matches.length} matching job{matches.length !== 1 ? 's' : ''} based on your resume
                    </p>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Detected Skills:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {analyzedSkills.slice(0, 8).map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-primary border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                        {analyzedSkills.length > 8 && (
                          <span className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-secondary">
                            +{analyzedSkills.length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {analysisState === 'error' && error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Analysis Failed</h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Results Section */}
            {analysisState === 'success' && matches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Top Matching Jobs
                  </h2>
                  <span className="text-sm text-secondary">
                    {matches.length} result{matches.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="space-y-4">
                  {matches.map((match) => (
                    <JobMatchCard
                      key={match.job.id}
                      job={match.job}
                      matchPercentage={match.matchPercentage}
                      matchedSkills={match.matchedSkills}
                      matchReason={match.matchReason}
                      onApply={() => handleApply(match.job.id)}
                      showApplyButton={isAuthenticated && user?.role !== 'recruiter'}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {analysisState === 'idle' && !selectedFile && (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Upload Your Resume to Get Started
                </h3>
                <p className="text-secondary max-w-md mx-auto">
                  Our AI will analyze your resume and match you with the most relevant job opportunities
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tips Card */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Pro Tips</h3>
                </div>
                <ul className="space-y-3 text-sm text-secondary">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use a well-structured resume with clear sections</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Include all relevant technical skills and tools</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Mention years of experience for better matching</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>List certifications and educational background</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep your resume updated with recent projects</span>
                  </li>
                </ul>
              </div>

              {/* How It Works */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/30 border border-primary/20 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Upload Resume</p>
                      <p className="text-xs text-secondary">Upload your resume in PDF or DOC format</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">AI Analysis</p>
                      <p className="text-xs text-secondary">Our AI extracts skills and keywords</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Get Matches</p>
                      <p className="text-xs text-secondary">Receive personalized job recommendations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Success Stories</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-primary">10,000+</p>
                    <p className="text-sm text-secondary">Resumes Analyzed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">85%</p>
                    <p className="text-sm text-secondary">Match Accuracy</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">3,500+</p>
                    <p className="text-sm text-secondary">Jobs Matched</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
