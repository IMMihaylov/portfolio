import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';
import { ScrollService } from '../../shared/services/scroll.service';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';

interface Stat {
  label: string;
  target: number;
  suffix: string;
  current: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  @ViewChild('statsSection', { static: true })
  statsSection!: ElementRef<HTMLElement>;

  private readonly scrollService = inject(ScrollService);
  private readonly destroyRef = takeUntilDestroyed();

  stats: Stat[] = [
    { label: 'Years of Experience', target: 7,  suffix: '+', current: 0 },
    { label: 'Platform Reach',      target: 3,  suffix: ' Platforms', current: 0 },
    { label: 'Degrees',             target: 3,  suffix: '',  current: 0 },
  ];

  ngOnInit(): void {
    this.scrollService
      .observeOnce$(this.statsSection.nativeElement)
      .pipe(
        switchMap(() =>
          interval(40).pipe(take(Math.max(...this.stats.map((s) => s.target)) + 1)),
        ),
        this.destroyRef,
      )
      .subscribe((tick) => {
        this.stats = this.stats.map((s) => ({
          ...s,
          current: Math.min(tick as number, s.target),
        }));
      });
  }
}
