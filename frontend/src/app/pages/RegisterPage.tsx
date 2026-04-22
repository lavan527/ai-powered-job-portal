import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'jobseeker' | 'recruiter'>('jobseeker');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await axios.post('http://localhost:8081/api/users/register', {
        name,
        email,
        password,
        role
      });

      toast.success('Account created successfully!');
      navigate('/login');

    } catch (err: any) {
      toast.error(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <Briefcase className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-secondary">Join thousands of job seekers and recruiters</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <Label className="mb-3 block">I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('jobseeker')}
                  className={`p-4 rounded-lg border-2 ${
                    role === 'jobseeker'
                      ? 'border-primary bg-accent text-foreground'
                      : 'border-border bg-background text-secondary'
                  }`}
                >
                  <p className="font-medium">Job Seeker</p>
                  <p className="text-xs mt-1">Looking for jobs</p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`p-4 rounded-lg border-2 ${
                    role === 'recruiter'
                      ? 'border-primary bg-accent text-foreground'
                      : 'border-border bg-background text-secondary'
                  }`}
                >
                  <p className="font-medium">Recruiter</p>
                  <p className="text-xs mt-1">Hiring talent</p>
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2"
              />
            </div>

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

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}