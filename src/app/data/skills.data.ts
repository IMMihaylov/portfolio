import type { Skill } from '../models/skill.model';

export const SKILLS: Skill[] = [
  // Frontend
  {
    name: 'Angular',
    category: 'frontend',
    level: 'expert',
    icon: 'angular',
    color: '#DD0031',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 'expert',
    icon: 'typescript',
    color: '#3178C6',
  },
  {
    name: 'HTML5 / CSS3',
    category: 'frontend',
    level: 'expert',
    icon: 'html5',
    color: '#E34F26',
  },
  {
    name: 'SCSS / Tailwind',
    category: 'frontend',
    level: 'expert',
    icon: 'css3',
    color: '#06B6D4',
  },
  // State Management
  {
    name: 'NgRx',
    category: 'state-management',
    level: 'expert',
    icon: 'ngrx',
    color: '#BA2BD2',
  },
  {
    name: 'RxJS',
    category: 'state-management',
    level: 'expert',
    icon: 'rxjs',
    color: '#B7178C',
  },
  // Backend / Node
  {
    name: 'Node.js',
    category: 'backend',
    level: 'advanced',
    icon: 'nodejs',
    color: '#339933',
  },
  {
    name: 'REST APIs',
    category: 'backend',
    level: 'advanced',
    icon: 'api',
    color: '#FF6B35',
  },
  // Mobile
  {
    name: 'Android (Kotlin)',
    category: 'mobile',
    level: 'advanced',
    icon: 'android',
    color: '#3DDC84',
  },
  {
    name: 'iOS (Swift)',
    category: 'mobile',
    level: 'proficient',
    icon: 'ios',
    color: '#000000',
  },
  // Data
  {
    name: 'Vertica SQL',
    category: 'data',
    level: 'advanced',
    icon: 'database',
    color: '#00ADEF',
  },
  // Tools
  {
    name: 'Git / GitHub',
    category: 'tools',
    level: 'expert',
    icon: 'git',
    color: '#F05032',
  },
  {
    name: 'Microservices',
    category: 'backend',
    level: 'advanced',
    icon: 'microservices',
    color: '#4A90E2',
  },
  {
    name: 'Offline-first PWA',
    category: 'frontend',
    level: 'advanced',
    icon: 'pwa',
    color: '#5A0FC8',
  },
];

export const SKILL_CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  'state-management': 'State Management',
  backend: 'Backend & APIs',
  mobile: 'Mobile',
  data: 'Data & Analytics',
  tools: 'Tools',
};
