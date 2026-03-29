import { Job } from '../data/jobs';

// Common tech skills to look for in resumes
const COMMON_SKILLS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
  'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'SQL',
  'Figma', 'UI/UX', 'Design', 'HTML', 'CSS', 'Tailwind',
  'Next.js', 'Vue', 'Angular', 'Django', 'Flask', 'Spring',
  'Redis', 'GraphQL', 'REST', 'API', 'Git', 'CI/CD',
  'Machine Learning', 'TensorFlow', 'Data', 'Analytics',
  'Swift', 'Kotlin', 'React Native', 'Mobile', 'iOS', 'Android',
  'Firebase', 'Jenkins', 'DevOps', 'Microservices', 'Agile',
  'Prototyping', 'User Research', 'Adobe XD', 'Sketch'
];

interface ParsedResume {
  skills: string[];
  text: string;
  keywords: string[];
}

/**
 * Extract skills and keywords from resume text
 */
export function parseResumeText(text: string): ParsedResume {
  const lowerText = text.toLowerCase();
  const foundSkills: string[] = [];
  
  // Find matching skills
  COMMON_SKILLS.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

  // Extract simple keywords (words longer than 3 chars that appear multiple times)
  const words = text.match(/\b[a-zA-Z]{4,}\b/g) || [];
  const wordFrequency: Record<string, number> = {};
  
  words.forEach(word => {
    const lower = word.toLowerCase();
    wordFrequency[lower] = (wordFrequency[lower] || 0) + 1;
  });

  const keywords = Object.entries(wordFrequency)
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);

  return {
    skills: foundSkills,
    text,
    keywords
  };
}

interface JobMatch {
  job: Job;
  matchPercentage: number;
  matchedSkills: string[];
  matchReason: string;
}

/**
 * Calculate match percentage between resume and job
 */
export function calculateJobMatches(resume: ParsedResume, jobs: Job[]): JobMatch[] {
  const matches: JobMatch[] = [];

  jobs.forEach(job => {
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const resumeSkills = resume.skills.map(s => s.toLowerCase());
    
    // Find matching skills
    const matchedSkills = job.skills.filter(jobSkill =>
      resumeSkills.includes(jobSkill.toLowerCase())
    );

    // Calculate base match percentage
    let matchPercentage = 0;
    if (job.skills.length > 0) {
      matchPercentage = (matchedSkills.length / job.skills.length) * 100;
    }

    // Boost if job title keywords appear in resume
    const titleWords = job.title.toLowerCase().split(' ');
    const resumeLower = resume.text.toLowerCase();
    const titleMatches = titleWords.filter(word => 
      word.length > 3 && resumeLower.includes(word)
    );
    
    if (titleMatches.length > 0) {
      matchPercentage += 10;
    }

    // Boost if company or location mentioned
    if (resumeLower.includes(job.company.toLowerCase())) {
      matchPercentage += 5;
    }

    // Cap at 100%
    matchPercentage = Math.min(Math.round(matchPercentage), 100);

    // Determine match reason
    let matchReason = '';
    if (matchedSkills.length > 0) {
      matchReason = `${matchedSkills.length} skill${matchedSkills.length > 1 ? 's' : ''} matched`;
    } else if (titleMatches.length > 0) {
      matchReason = 'Role matches your experience';
    } else {
      matchReason = 'Relevant to your profile';
    }

    if (matchPercentage > 0) {
      matches.push({
        job,
        matchPercentage,
        matchedSkills,
        matchReason
      });
    }
  });

  // Sort by match percentage (highest first)
  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return matches;
}

/**
 * Read file as text (for PDF we'll simulate, in real app would use PDF parser)
 */
export async function readResumeFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      // For demo: if PDF, simulate extracted text
      if (file.type === 'application/pdf') {
        // Simulate PDF extraction with sample resume text
        resolve(`
          Senior Frontend Developer
          
          EXPERIENCE
          5+ years of experience in web development
          Specialized in React, TypeScript, and modern JavaScript frameworks
          Built scalable applications using Node.js and Next.js
          Proficient in UI/UX design with Figma
          Strong experience with AWS, Docker, and CI/CD pipelines
          
          SKILLS
          React, TypeScript, JavaScript, Node.js, Next.js
          Tailwind CSS, HTML, CSS, UI/UX Design
          AWS, Docker, Kubernetes, PostgreSQL, MongoDB
          Git, REST API, GraphQL, Agile, Microservices
          Figma, Adobe XD, Prototyping
          
          EDUCATION
          Bachelor's in Computer Science
        `);
      } else {
        // For text files, use actual content
        resolve(text);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    if (file.type === 'application/pdf') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
}
