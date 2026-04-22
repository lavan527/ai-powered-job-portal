import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<any[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    axios.get("http://localhost:8081/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, [user]);

  // ✅ FETCH APPLIED JOBS
  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`http://localhost:8081/api/applications/user/${user.id}`)
      .then(res => {
        console.log("Applications:", res.data);
        setAppliedJobs(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const savedJobs: any[] = [];

  if (user.role === 'jobseeker') {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-secondary">Welcome back, {user.name}!</p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 via-accent/30 to-background border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Try AI Resume Matching</h3>
                <p className="text-sm text-secondary mb-3">
                  Upload your resume and let AI find the perfect jobs for you
                </p>
                <Button onClick={() => navigate('/resume-match')} size="sm">
                  Get AI Job Matches
                </Button>
              </div>
            </div>
          </div>

          {/* ✅ FIXED STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-card border rounded-xl p-6">
              <p className="text-2xl font-bold">{appliedJobs.length}</p>
              <p className="text-sm text-secondary">Applied Jobs</p>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <p className="text-2xl font-bold">{savedJobs.length}</p>
              <p className="text-sm text-secondary">Saved Jobs</p>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <p className="text-2xl font-bold">{jobs.length}</p>
              <p className="text-sm text-secondary">Available Jobs</p>
            </div>

          </div>

          {/* ✅ SHOW APPLIED JOBS */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>

            <div className="space-y-4">
              {appliedJobs.map((app) => (
                <div key={app.id} className="bg-card border rounded-xl p-4">
                  <p>Applied Job ID: {app.jobId}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>

            <div className="space-y-4">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="bg-card border rounded-xl p-6">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-secondary">{job.company}</p>

                  <div className="flex gap-2 mt-2">
                    <Badge>{job.location}</Badge>
                    <Badge>{job.salary}</Badge>
                  </div>

                  <Button
                    className="mt-3"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2>Recruiter Dashboard (Next Step)</h2>
    </div>
  );
}