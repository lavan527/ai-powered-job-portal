import { MapPin, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Job } from '../data/jobs';

interface JobMatchCardProps {
  job: Job;
  matchPercentage: number;
  matchedSkills: string[];
  matchReason: string;
  onApply?: () => void;
  showApplyButton?: boolean;
}

export function JobMatchCard({
  job,
  matchPercentage,
  matchedSkills,
  matchReason,
  onApply,
  showApplyButton = true
}: JobMatchCardProps) {

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getBadgeColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-700 border-green-200';
    if (percentage >= 60) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (percentage >= 40) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-secondary">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Match Badge */}
        <div className={`px-4 py-2 rounded-lg border-2 font-semibold text-sm ${getBadgeColor(matchPercentage)}`}>
          {matchPercentage}% Match
        </div>
      </div>

      {/* 🔥 NEW: PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
        <div
          className={`${getMatchColor(matchPercentage)} h-2 rounded-full transition-all`}
          style={{ width: `${matchPercentage}%` }}
        />
      </div>

      {/* Job Info */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm text-secondary">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4" />
          <span>{job.salary}</span>
        </div>
      </div>

      {/* Match Reason */}
      <div className="mb-4">
        <p className="text-sm text-secondary italic">
          {matchReason}
        </p>
      </div>

      {/* Matched Skills */}
      {matchedSkills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-secondary mb-2">Matched Skills:</p>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.slice(0, 4).map((skill) => (
              <Badge 
                key={skill} 
                className="text-xs bg-green-100 text-green-700 border-green-300"
              >
                {skill}
              </Badge>
            ))}
            {matchedSkills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{matchedSkills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Link to={`/jobs/${job.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        {showApplyButton && onApply && (
          <Button onClick={onApply} className="flex-1">
            Apply Now
          </Button>
        )}
      </div>
    </div>
  );
}