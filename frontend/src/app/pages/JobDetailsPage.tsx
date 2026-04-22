import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { MapPin, DollarSign, Briefcase, Clock, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [job, setJob] = useState<any>(null);

  // 🚀 FETCH FROM BACKEND
  useEffect(() => {
    fetch(`http://localhost:8081/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("JOB DETAILS:", data);
        setJob(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role === 'recruiter') {
      toast.error('Recruiters cannot apply to jobs');
      return;
    }
    toast.success('Application submitted successfully!');
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    toast.success('Job saved!');
  };

  // ✅ Convert skills string → array
  const skillsArray = (job.skillsRequired || "").split(",");

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-6">

        <Button variant="ghost" onClick={() => navigate('/jobs')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        {/* Header */}
        <div className="bg-card border rounded-xl p-8 mb-6">
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-lg text-secondary">{job.company}</p>

          <div className="flex gap-6 mt-4 text-secondary">
            <span><MapPin className="inline w-4 h-4" /> {job.location}</span>
            <span><DollarSign className="inline w-4 h-4" /> {job.salary}</span>
            <span><Clock className="inline w-4 h-4" /> Recently</span>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={handleApply}>Apply Now</Button>
            <Button variant="outline" onClick={handleSave}>Save Job</Button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p>{job.description}</p>
        </div>

        {/* Skills */}
        <div className="bg-card border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Required Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {skillsArray.map((skill: string, index: number) => (
              <Badge key={index}>{skill}</Badge>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}