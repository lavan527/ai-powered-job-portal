import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import { Link } from 'react-router';
import { Job } from '../data/jobs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface JobCardProps {
  job: Job;
  showActions?: boolean;
}

export function JobCard({ job, showActions = true }: JobCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
              <p className="text-sm text-secondary">{job.company}</p>
            </div>
          </div>
        </div>
        {job.featured && (
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

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
          <span>{job.postedDate}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{job.skills.length - 3} more
          </Badge>
        )}
      </div>

      {showActions && (
        <div className="flex gap-2">
          <Link to={`/jobs/${job.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
