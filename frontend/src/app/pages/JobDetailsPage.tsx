import { useParams, useNavigate } from 'react-router';
import { MapPin, DollarSign, Briefcase, Clock, Building2, ArrowLeft } from 'lucide-react';
import { mockJobs } from '../data/jobs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Job Not Found</h2>
          <p className="text-secondary mb-4">The job you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
        </div>
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
    toast.success('Job saved to your favorites!');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/jobs')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>

        {/* Job Header */}
        <div className="bg-card border border-border rounded-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                <p className="text-lg text-secondary">{job.company}</p>
              </div>
            </div>
            {job.featured && (
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-2 text-secondary">
              <MapPin className="w-5 h-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <DollarSign className="w-5 h-5" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <Clock className="w-5 h-5" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <Building2 className="w-5 h-5" />
              <span>{job.postedDate}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleApply} size="lg" className="px-8">
              Apply Now
            </Button>
            <Button onClick={handleSave} variant="outline" size="lg">
              Save Job
            </Button>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
              <p className="text-secondary leading-relaxed">{job.description}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-2 text-secondary">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Develop and maintain high-quality code</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Collaborate with cross-functional teams</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Participate in code reviews and technical discussions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Contribute to technical documentation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Stay updated with industry trends and best practices</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Qualifications
              </h2>
              <ul className="space-y-2 text-secondary">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>3+ years of professional experience</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Bachelor's degree in Computer Science or related field</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Strong problem-solving and communication skills</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Experience with modern development tools and practices</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Company Overview</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-secondary mb-1">Company</p>
                  <p className="font-medium text-foreground">{job.company}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Industry</p>
                  <p className="font-medium text-foreground">Technology</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Company Size</p>
                  <p className="font-medium text-foreground">50-200 employees</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Founded</p>
                  <p className="font-medium text-foreground">2015</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Job Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-secondary mb-1">Job Type</p>
                  <Badge>{job.type}</Badge>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Salary Range</p>
                  <p className="font-medium text-foreground">{job.salary}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Location</p>
                  <p className="font-medium text-foreground">{job.location}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Posted</p>
                  <p className="font-medium text-foreground">{job.postedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
