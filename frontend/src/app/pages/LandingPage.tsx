import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapPin, TrendingUp, Users, Zap, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { JobCard } from '../components/JobCard';

export function LandingPage() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:8081/api/jobs")
      .then(res => res.json())
      .then(data => {
        console.log("HOME JOBS:", data);
        setJobs(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    navigate(`/jobs?keyword=${keyword}&location=${location}`);
  };

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/30 to-background py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-secondary">
              Discover thousands of job opportunities from top companies
            </p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <Input
                  placeholder="Job title or keyword"
                  className="pl-10 h-12"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <Input
                  placeholder="City or state"
                  className="pl-10 h-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <Button onClick={handleSearch} className="h-12 px-8">
                Search Jobs
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* ✅ FEATURED JOBS FROM BACKEND */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Jobs</h2>
            <p className="text-secondary">Jobs from your backend</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => navigate('/jobs')} variant="outline" size="lg">
              View All Jobs
            </Button>
          </div>

        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/30 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">

            <h2 className="text-4xl font-bold mb-4">
              Let AI Find Your Perfect Job Match
            </h2>

            <p className="text-xl text-secondary mb-8">
              Upload your resume and get matched jobs instantly
            </p>

            <Button onClick={() => navigate('/resume-match')} size="lg">
              Try AI Resume Match
            </Button>

          </div>
        </div>
      </section>

    </div>
  );
}