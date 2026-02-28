import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {

  observeOnce$(element: Element, threshold = 0.15): Observable<boolean> {
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
