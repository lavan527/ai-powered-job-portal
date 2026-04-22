import { Link } from 'react-router';
import { Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-xl text-foreground">JobPortal</span>
            </Link>
            <p className="text-sm text-secondary">
              Find your dream job or hire the best talent for your company.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-secondary hover:text-primary">Home</Link></li>
              <li><Link to="/jobs" className="text-sm text-secondary hover:text-primary">Browse Jobs</Link></li>
              <li><Link to="/login" className="text-sm text-secondary hover:text-primary">Login</Link></li>
              <li><Link to="/register" className="text-sm text-secondary hover:text-primary">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-sm text-secondary hover:text-primary">Browse Jobs</Link></li>
              <li><Link to="/profile" className="text-sm text-secondary hover:text-primary">Career Advice</Link></li>
              <li><Link to="/profile" className="text-sm text-secondary hover:text-primary">Resume Tips</Link></li>
              <li><Link to="/dashboard" className="text-sm text-secondary hover:text-primary">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><Link to="/post-job" className="text-sm text-secondary hover:text-primary">Post a Job</Link></li>
              <li><Link to="/dashboard" className="text-sm text-secondary hover:text-primary">Browse Candidates</Link></li>
              <li><Link to="/dashboard" className="text-sm text-secondary hover:text-primary">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-sm text-secondary hover:text-primary">Resources</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary">
            © 2026 JobPortal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-secondary hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-secondary hover:text-primary">Terms of Service</Link>
            <Link to="/contact" className="text-sm text-secondary hover:text-primary">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}