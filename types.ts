export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  type: 'research' | 'work';
  advisors?: string;
  link?: string;
  skills?: string[];
}

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Workshop {
  id: string;
  title: string;
  role?: string; // e.g., "Session Chair", "Remote"
  location: string;
  date: string;
  details?: string[];
}

export interface Position {
  id: string;
  role: string;
  organization: string;
  period: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string;
}