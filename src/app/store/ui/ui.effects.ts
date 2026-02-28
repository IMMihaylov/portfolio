import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { UiActions } from './ui.actions';

@Injectable()
export class UiEffects {
  private readonly actions$ = inject(Actions);
  private readonly platformId = inject(PLATFORM_ID);

  scrollTracking$ = createEffect(() =>
    isPlatformBrowser(this.platformId)
      ? fromEvent(window, 'scroll').pipe(
          debounceTime(50),
          map(() => Math.round(window.scrollY)),
          distinctUntilChanged(),
          map((scrollY) => UiActions.updateScrollPosition({ scrollY })),
        )
      : EMPTY,
  );

  sectionTracking$ = createEffect(() =>
    isPlatformBrowser(this.platformId)
      ? fromEvent(window, 'scroll').pipe(
          debounceTime(100),
          map(() => this.detectActiveSection()),
          distinctUntilChanged(),
          map((section) => UiActions.setActiveSection({ section })),
        )
      : EMPTY,
  );

  private detectActiveSection(): string {
    const sections = ['home', 'about', 'skills', 'experience', 'education', 'contact'];
    const scrollY = window.scrollY + 100;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const { offsetTop, offsetHeight } = el;
      if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
        return id;
      }
    }

    return 'home';
  }
}
