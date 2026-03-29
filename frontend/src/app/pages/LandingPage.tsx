import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapPin, TrendingUp, Users, Zap, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { JobCard } from '../components/JobCard';
import { mockJobs } from '../data/jobs';

export function LandingPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const featuredJobs = mockJobs.filter(job => job.featured);

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
              Discover thousands of job opportunities from top companies around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <Input
                  placeholder="Job title or keyword"
                  className="pl-10 h-12 border-border"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                <Input
                  placeholder="City or state"
                  className="pl-10 h-12 border-border"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch} className="h-12 px-8">
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">10,000+</h3>
              <p className="text-secondary">Active Jobs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">5,000+</h3>
              <p className="text-secondary">Companies</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">8,000+</h3>
              <p className="text-secondary">Success Stories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Jobs</h2>
            <p className="text-secondary">Handpicked job opportunities from top companies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
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

      {/* AI Resume Match CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/30 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-border p-12 text-center shadow-lg">
            <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">New AI Feature</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Let AI Find Your Perfect Job Match
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto mb-8">
              Upload your resume and our AI will instantly match you with the most relevant job opportunities based on your skills and experience
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/resume-match')}
                size="lg"
                className="px-8"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Try AI Resume Match
              </Button>
              <Button
                onClick={() => navigate('/jobs')}
                size="lg"
                variant="outline"
              >
                Browse All Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Zap className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of job seekers and recruiters finding success on our platform
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/register')}
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => navigate('/jobs')}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}