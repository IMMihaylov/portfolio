import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Returns an Observable that emits `true` once the given element
   * enters the viewport (with a 10% threshold) and `false` when it leaves.
   * Wraps the native IntersectionObserver API in a clean RxJS stream,
   * completing after the first `true` emission (fire-and-forget animation).
   */
  observeOnce$(element: Element, threshold = 0.15): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(false);
    }

    return new Observable<boolean>((subscriber) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              subscriber.next(true);
              subscriber.complete();
              observer.disconnect();
            }
          });
        },
        { threshold },
      );

      observer.observe(element);

      return () => observer.disconnect();
    });
  }
}
