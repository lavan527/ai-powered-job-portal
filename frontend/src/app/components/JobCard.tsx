import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface JobCardProps {
  job: any;
  showActions?: boolean;
}

export function JobCard({ job, showActions = true }: JobCardProps) {

  const { user } = useAuth();

  const skillsArray = (job.skillsRequired || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0);

  // 🚀 APPLY FUNCTION
  const applyJob = async () => {
    try {
      await axios.post("http://localhost:8081/api/applications/apply", {
        userId: user.id,
        jobId: job.id
      });

      alert("Applied successfully!");
    } catch (err) {
      alert("Failed to apply");
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
              <p className="text-sm text-secondary">{job.company}</p>

              <p className="text-sm text-secondary mt-2 line-clamp-2">
                {job.description}
              </p>
            </div>
          </div>
        </div>

        {job.featured && (
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-secondary">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{job.postedDate || "Recently"}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skillsArray.slice(0, 3).map((skill: string, index: number) => (
          <Badge key={index} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}

        {skillsArray.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{skillsArray.length - 3} more
          </Badge>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex gap-2">
          <Link to={`/jobs/${job.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>

          {/* 🚀 APPLY BUTTON */}
          {user && user.role === 'jobseeker' && (
            <Button onClick={applyJob} className="flex-1">
              Apply
            </Button>
          )}
        </div>
      )}
    </div>
  );
}