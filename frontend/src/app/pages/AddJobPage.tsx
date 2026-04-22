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

  // 🚀 UPDATED SUBMIT FUNCTION (CONNECTED TO BACKEND)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: formData.title,
          company: formData.company,
          location: formData.location,
          description: formData.description,
          skillsRequired: formData.skills, // ✅ important
          salary: formData.salary
        })
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      toast.success("Job posted successfully!");

      // 🔄 Redirect to jobs page
      navigate("/jobs");

    } catch (error) {
      console.error(error);
      toast.error("Error posting job");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-6">

        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h1>
          <p className="text-secondary">Fill in the details to create a job posting</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8">
          <div className="space-y-6">

            <div>
              <Label>Job Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Company Name *</Label>
              <Input
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Location *</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Job Type</Label>
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

            <div>
              <Label>Salary</Label>
              <Input
                value={formData.salary}
                onChange={(e) => handleChange('salary', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Job Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="mt-2 min-h-[200px]"
              />
            </div>

            <div>
              <Label>Required Skills</Label>
              <Input
                value={formData.skills}
                onChange={(e) => handleChange('skills', e.target.value)}
                className="mt-2"
              />
            </div>

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