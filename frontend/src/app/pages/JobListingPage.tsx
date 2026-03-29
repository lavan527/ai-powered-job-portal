import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Filter, X } from 'lucide-react';
import { JobCard } from '../components/JobCard';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';

export function JobListingPage() {

  const [searchParams] = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';
  const initialLocation = searchParams.get('location') || '';

  const [jobs, setJobs] = useState<any[]>([]); // ✅ NEW
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 200]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
  const allSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Figma', 'UI/UX Design'];

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:8081/api/jobs")
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data);
        setJobs(data);
      })
      .catch(err => console.error("API ERROR:", err));
  }, []);

  // 🔥 FILTER USING API DATA
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesKeyword =
        keyword === '' ||
        job.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company?.toLowerCase().includes(keyword.toLowerCase());

      const matchesLocation =
        location === '' ||
        job.location?.toLowerCase().includes(location.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(job.type);

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some(skill => job.skills?.includes(skill));

      return matchesKeyword && matchesLocation && matchesType && matchesSkills;
    });
  }, [jobs, keyword, location, selectedTypes, selectedSkills]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setKeyword('');
    setLocation('');
    setSelectedTypes([]);
    setSelectedSkills([]);
    setSalaryRange([0, 200]);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Jobs</h1>
          <p className="text-secondary">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex gap-8">

          {/* Filters Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Filters</h2>
                </div>

                {(keyword || location || selectedTypes.length > 0 || selectedSkills.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-6">

                <div>
                  <Label>Search Keyword</Label>
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Job Type</Label>
                  {jobTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                      />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <Label>Skills</Label>
                  {allSkills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => toggleSkill(skill)}
                      />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </aside>

          {/* Job List */}
          <main className="flex-1">
            {filteredJobs.length === 0 ? (
              <div className="text-center">No jobs found</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}