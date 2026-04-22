import * as pdfjsLib from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker?url"; // ✅ FIXED WORKER
import { Job } from '../data/jobs';

// ✅ USE SAME VERSION WORKER (VERY IMPORTANT)
pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

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

// 🧠 Extract skills
export function parseResumeText(text: string): ParsedResume {
  const lowerText = text.toLowerCase();
  const foundSkills: string[] = [];
  
  COMMON_SKILLS.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });

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

// 🤖 Match logic
export function calculateJobMatches(resume: ParsedResume, jobs: any[]): JobMatch[] {
  const matches: JobMatch[] = [];

  jobs.forEach(job => {

    const jobSkills = (job.skillsRequired || "")
      .toLowerCase()
      .split(",");

    const resumeSkills = resume.skills.map(s => s.toLowerCase());

    const matchedSkills = jobSkills.filter((js: string) =>
      resumeSkills.some(rs => js.includes(rs))
    );

    let matchPercentage = 0;

    if (jobSkills.length > 0) {
      matchPercentage = (matchedSkills.length / jobSkills.length) * 100;
    }

    const titleWords = job.title.toLowerCase().split(' ');
    const resumeLower = resume.text.toLowerCase();

    const titleMatches = titleWords.filter(word =>
      word.length > 3 && resumeLower.includes(word)
    );

    if (titleMatches.length > 0) {
      matchPercentage += 10;
    }

    matchPercentage = Math.min(Math.round(matchPercentage), 100);

    let matchReason = '';

    if (matchedSkills.length > 0) {
      matchReason = `${matchedSkills.length} skills matched`;
    } else if (titleMatches.length > 0) {
      matchReason = 'Role matches your experience';
    } else {
      matchReason = 'Relevant job';
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

  matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return matches;
}

// 📄 READ FILE (PDF + TXT)
export async function readResumeFile(file: File): Promise<string> {
  try {
    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const pageText = content.items
          .map((item: any) => item.str)
          .join(" ");

        text += pageText + " ";
      }

      return text;
    }

    return await file.text();

  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}