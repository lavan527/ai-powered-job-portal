import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function AddJobPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    company: user?.company || '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: '',
    skills: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'recruiter') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'recruiter') {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Job posted successfully!');
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h1>
          <p className="text-secondary">Fill in the details to create a job posting</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8">
          <div className="space-y-6">
            {/* Job Title */}
            <div>
              <Label htmlFor="title">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Location & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location">
                  Location <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary */}
            <div>
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                placeholder="e.g. $100k - $150k"
                value={formData.salary}
                onChange={(e) => handleChange('salary', e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">
                Job Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="mt-2 min-h-[200px]"
              />
            </div>

            {/* Skills */}
            <div>
              <Label htmlFor="skills">Required Skills</Label>
              <Input
                id="skills"
                placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                value={formData.skills}
                onChange={(e) => handleChange('skills', e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-secondary mt-2">
                Separate multiple skills with commas
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" size="lg" className="flex-1">
                Post Job
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}