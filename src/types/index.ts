export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  company: string;
  blog: string;
  twitter_username: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  homepage: string;
  private: boolean;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  stars: number;
  forks: number;
  url: string;
  live?: string;
  language: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  type: 'work' | 'education' | 'achievement';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
