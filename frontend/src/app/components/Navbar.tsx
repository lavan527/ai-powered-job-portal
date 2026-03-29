import { Link, useNavigate } from 'react-router';
import { Briefcase, User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl text-foreground">JobPortal</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">
              Jobs
            </Link>
            <Link to="/resume-match" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              AI Match
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
                {user?.role === 'recruiter' && (
                  <Link to="/add-job" className="text-foreground hover:text-primary transition-colors">
                    Post Job
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-4 border-l border-border pl-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{user?.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-secondary hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}