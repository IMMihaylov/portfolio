export interface Skill {
  name: string;
  category: SkillCategory;
  level: 'expert' | 'advanced' | 'proficient';
  icon: string;
  color: string;
}

export type SkillCategory = 'frontend' | 'state-management' | 'backend' | 'mobile' | 'data' | 'tools';
