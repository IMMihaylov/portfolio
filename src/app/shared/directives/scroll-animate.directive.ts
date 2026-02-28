import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScrollService } from '../services/scroll.service';

export type ScrollDirection = 'up' | 'left' | 'right';

/**
 * Directive that reveals an element with a slide/fade animation
 * when it enters the viewport, using IntersectionObserver via ScrollService.
 *
 * Usage:
 *   <div scrollAnimate direction="left" [delay]="200">...</div>
 */
@Directive({
  selector: '[scrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit {
  @Input() direction: ScrollDirection = 'up';
  @Input() delay = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly scrollService = inject(ScrollService);
  private readonly destroyRef = takeUntilDestroyed();

  ngOnInit(): void {
    const nativeEl: HTMLElement = this.el.nativeElement;

    nativeEl.classList.add('scroll-hidden');

    if (this.direction === 'left') {
      nativeEl.classList.add('scroll-from-left');
    } else if (this.direction === 'right') {
      nativeEl.classList.add('scroll-from-right');
    }

    this.scrollService
      .observeOnce$(nativeEl)
      .pipe(this.destroyRef)
      .subscribe(() => {
        setTimeout(() => {
          nativeEl.classList.add('scroll-visible');
        }, this.delay);
      });
  }
}
