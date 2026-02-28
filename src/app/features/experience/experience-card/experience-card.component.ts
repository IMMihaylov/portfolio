import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ScrollAnimateDirective } from '../../../shared/directives/scroll-animate.directive';
import type { Experience } from '../../../models/experience.model';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './experience-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCardComponent {
  readonly experience = input.required<Experience>();
  readonly index = input.required<number>();
  readonly isLeft = input.required<boolean>();
}
