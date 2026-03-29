export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  description: string;
  skills: string[];
  postedDate: string;
  featured?: boolean;
  companyLogo?: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building beautiful, responsive user interfaces using React and modern web technologies.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    postedDate: '2 days ago',
    featured: true,
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    salary: '$90k - $130k',
    type: 'Full-time',
    description: 'Join our creative team as a Product Designer. You will work on designing intuitive and beautiful user experiences for our products.',
    skills: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
    postedDate: '3 days ago',
    featured: true,
  },
  {
    id: '3',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Austin, TX',
    salary: '$100k - $150k',
    type: 'Full-time',
    description: 'We need a talented Full Stack Engineer to help us build scalable web applications. You should be comfortable with both frontend and backend technologies.',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
    postedDate: '5 days ago',
    featured: false,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions',
    location: 'Seattle, WA',
    salary: '$130k - $170k',
    type: 'Full-time',
    description: 'Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
    postedDate: '1 week ago',
    featured: false,
  },
  {
    id: '5',
    title: 'Mobile App Developer',
    company: 'AppMakers',
    location: 'Los Angeles, CA',
    salary: '$110k - $140k',
    type: 'Full-time',
    description: 'Join our mobile team to create amazing iOS and Android applications.',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    postedDate: '4 days ago',
    featured: true,
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    salary: '$115k - $155k',
    type: 'Full-time',
    description: 'We are seeking a Data Scientist to analyze complex datasets and build machine learning models.',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    postedDate: '6 days ago',
    featured: false,
  },
  {
    id: '7',
    title: 'Backend Developer',
    company: 'API Systems',
    location: 'Remote',
    salary: '$95k - $135k',
    type: 'Remote',
    description: 'Remote Backend Developer position. Build and maintain scalable APIs and microservices.',
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
    postedDate: '3 days ago',
    featured: false,
  },
  {
    id: '8',
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    location: 'Chicago, IL',
    salary: '$85k - $120k',
    type: 'Full-time',
    description: 'Create stunning user interfaces and delightful user experiences for web and mobile applications.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    postedDate: '1 week ago',
    featured: false,
  },
];
