import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import axios from 'axios';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'jobseeker' | 'recruiter'>('jobseeker');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8081/api/users/login', {
        email,
        password,
        role
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success('Welcome back!');
      navigate('/dashboard');

    } catch (err) {
      toast.error('Invalid email, password or role');
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-secondary">Sign in to your account to continue</p>
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}