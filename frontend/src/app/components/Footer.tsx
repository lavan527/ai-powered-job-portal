import { Link } from 'react-router';
import { Briefcase } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
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

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-secondary hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-secondary hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-secondary hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-secondary hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary">
            © 2026 JobPortal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
