import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Briefcase, MapPin, Edit2, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    skills: user?.skills?.join(', ') || '',
    location: 'San Francisco, CA',
    bio: 'Passionate developer with experience in building modern web applications.',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
            <p className="text-secondary">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-xl mb-1">{user.name}</h3>
              <p className="text-sm text-secondary mb-4">{user.email}</p>
              <Badge className="mb-4">
                {user.role === 'jobseeker' ? 'Job Seeker' : 'Recruiter'}
              </Badge>
              {user.role === 'jobseeker' && (
                <div className="mt-6 pt-6 border-t border-border">
                  <Button variant="outline" className="w-full">
                    Upload Resume
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Personal Information
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Skills (for job seekers) */}
            {user.role === 'jobseeker' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Skills</h2>
                <div>
                  <Label htmlFor="skills">Your Skills</Label>
                  {isEditing ? (
                    <Input
                      id="skills"
                      placeholder="React, TypeScript, Node.js"
                      value={formData.skills}
                      onChange={(e) => handleChange('skills', e.target.value)}
                      className="mt-2"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.split(',').map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-secondary mt-2">
                    Separate multiple skills with commas
                  </p>
                </div>
              </div>
            )}

            {/* Company Info (for recruiters) */}
            {user.role === 'recruiter' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Company Information
                </h2>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative mt-2">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <Input
                      id="company"
                      value={user.company}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}