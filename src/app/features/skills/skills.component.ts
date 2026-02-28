import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { SKILLS, SKILL_CATEGORY_LABELS } from '../../data/skills.data';
import type { Skill, SkillCategory } from '../../models/skill.model';

interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollAnimateDirective, NgClass],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  readonly activeFilter = signal<SkillCategory | 'all'>('all');

  readonly allGroups: SkillGroup[] = this.buildGroups();

  readonly filteredGroups = computed<SkillGroup[]>(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allGroups;
    return this.allGroups.filter((g) => g.category === filter);
  });

  readonly filterOptions: Array<{ value: SkillCategory | 'all'; label: string }> = [
    { value: 'all',               label: 'All' },
    { value: 'frontend',          label: 'Frontend' },
    { value: 'state-management',  label: 'State Management' },
    { value: 'backend',           label: 'Backend & APIs' },
    { value: 'mobile',            label: 'Mobile' },
    { value: 'data',              label: 'Data & Analytics' },
    { value: 'tools',             label: 'Tools' },
  ];

  setFilter(value: SkillCategory | 'all'): void {
    this.activeFilter.set(value);
  }

  trackByCategory(_: number, group: SkillGroup): string {
    return group.category;
  }

  trackBySkill(_: number, skill: Skill): string {
    return skill.name;
  }

  private buildGroups(): SkillGroup[] {
    const map = new Map<SkillCategory, Skill[]>();
    for (const skill of SKILLS) {
      if (!map.has(skill.category)) map.set(skill.category, []);
      map.get(skill.category)!.push(skill);
    }
    return Array.from(map.entries()).map(([category, skills]) => ({
      category,
      label: SKILL_CATEGORY_LABELS[category] ?? category,
      skills,
    }));
  }
}
