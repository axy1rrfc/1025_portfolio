export interface GitHubProject {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  image?: string; // Optional project image
  size: number;
  license: {
    spdx_id: string;
  } | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'tools';
  level: number;
  experience: string;
  technologies: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  privacy: boolean;
}

export interface ThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  systemTheme: string | undefined;
}