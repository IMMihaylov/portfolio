import { createActionGroup, emptyProps, props } from '@ngrx/store';

export interface ContactFormValue {
  name: string;
  email: string;
  message: string;
}

export const ContactActions = createActionGroup({
  source: 'Contact',
  events: {
    'Submit Form': props<{ form: ContactFormValue }>(),
    'Submit Success': emptyProps(),
    'Submit Failure': props<{ error: string }>(),
    'Reset Form': emptyProps(),
  },
});
