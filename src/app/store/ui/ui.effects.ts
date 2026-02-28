import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { UiActions } from './ui.actions';

@Injectable()
export class UiEffects {
  private readonly actions$ = inject(Actions);

  scrollTracking$ = createEffect(() =>
    fromEvent(window, 'scroll').pipe(
      debounceTime(50),
      map(() => Math.round(window.scrollY)),
      distinctUntilChanged(),
      map((scrollY) => UiActions.updateScrollPosition({ scrollY })),
    ),
  );

  sectionTracking$ = createEffect(() =>
    fromEvent(window, 'scroll').pipe(
      debounceTime(100),
      map(() => this.detectActiveSection()),
      distinctUntilChanged(),
      map((section) => UiActions.setActiveSection({ section })),
    ),
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
