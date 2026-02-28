import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { EXPERIENCES } from '../../data/experience.data';
import type { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  readonly experiences: Experience[] = EXPERIENCES;

  trackById(_: number, exp: Experience): string {
    return exp.id;
  }

  isLeft(index: number): boolean {
    return index % 2 === 0;
  }
}
