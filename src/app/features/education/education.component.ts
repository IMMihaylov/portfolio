import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import { EDUCATIONS } from '../../data/education.data';
import type { Education } from '../../models/education.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './education.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  readonly educations: Education[] = EDUCATIONS;

  trackById(_: number, edu: Education): string {
    return edu.id;
  }
}
