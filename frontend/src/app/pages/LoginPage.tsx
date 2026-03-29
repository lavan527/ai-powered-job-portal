import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'jobseeker' | 'recruiter'>('jobseeker');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    login(email, password, role);
    toast.success('Welcome back!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <Briefcase className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-secondary">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="mb-3 block">I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('jobseeker')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    role === 'jobseeker'
                      ? 'border-primary bg-accent text-foreground'
                      : 'border-border bg-background text-secondary hover:border-primary/50'
                  }`}
                >
                  <p className="font-medium">Job Seeker</p>
                  <p className="text-xs mt-1">Looking for jobs</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    role === 'recruiter'
                      ? 'border-primary bg-accent text-foreground'
                      : 'border-border bg-background text-secondary hover:border-primary/50'
                  }`}
                >
                  <p className="font-medium">Recruiter</p>
                  <p className="text-xs mt-1">Hiring talent</p>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-muted border border-border rounded-lg p-4">
          <p className="text-xs text-secondary text-center">
            Demo: Use any email/password combination to sign in
          </p>
        </div>
      </div>
    </div>
  );
}
