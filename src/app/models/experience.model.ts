export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  startYear: number;
  endYear: number | null;
  type: 'full-time' | 'working-student' | 'internship' | 'part-time';
  highlights: string[];
  tags: string[];
}
