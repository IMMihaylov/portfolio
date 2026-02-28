import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { ContactActions } from './contact.actions';

@Injectable()
export class ContactEffects {
  private readonly actions$ = inject(Actions);

  /**
   * Simulates a form submission via mailto: fallback.
   * In a real application this would call an HTTP service.
   */
  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.submitForm),
      switchMap(({ form }) => {
        // Open mailto as a side-effect
        const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
        );
        window.location.href = `mailto:ivan.mihaylov@example.com?subject=${subject}&body=${body}`;

        return of(null).pipe(
          delay(800),
          map(() => ContactActions.submitSuccess()),
          catchError((err: unknown) =>
            of(ContactActions.submitFailure({ error: String(err) })),
          ),
        );
      }),
    ),
  );
}
