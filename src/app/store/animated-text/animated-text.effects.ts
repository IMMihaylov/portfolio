import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { interval, of } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { AnimatedTextActions } from './animated-text.actions';
import {
  selectCurrentPhraseIndex,
  selectDisplayText,
  selectIsDeleting,
  selectPhrases,
} from './animated-text.reducer';

@Injectable()
export class AnimatedTextEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  startAnimation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnimatedTextActions.startAnimation),
      switchMap(() =>
        interval(100).pipe(
          withLatestFrom(
            this.store.select(selectPhrases),
            this.store.select(selectCurrentPhraseIndex),
            this.store.select(selectDisplayText),
            this.store.select(selectIsDeleting),
          ),
          map(([, phrases, index, displayText, isDeleting]) => {
            const currentPhrase = phrases[index];

            if (!isDeleting) {
              if (displayText.length < currentPhrase.length) {
                return AnimatedTextActions.setDisplayText({
                  text: currentPhrase.slice(0, displayText.length + 1),
                });
              } else {
                return AnimatedTextActions.toggleDeleting({ isDeleting: true });
              }
            } else {
              if (displayText.length > 0) {
                return AnimatedTextActions.setDisplayText({
                  text: displayText.slice(0, -1),
                });
              } else {
                return AnimatedTextActions.advancePhrase();
              }
            }
          }),
        ),
      ),
    ),
  );
}
