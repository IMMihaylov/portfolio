import { createFeature, createReducer, on } from '@ngrx/store';
import { ContactActions, ContactFormValue } from './contact.actions';

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactState {
  formValue: ContactFormValue;
  status: ContactStatus;
  error: string | null;
}

const initialState: ContactState = {
  formValue: { name: '', email: '', message: '' },
  status: 'idle',
  error: null,
};

export const contactFeature = createFeature({
  name: 'contact',
  reducer: createReducer(
    initialState,
    on(ContactActions.submitForm, (state, { form }) => ({
      ...state,
      formValue: form,
      status: 'submitting' as ContactStatus,
      error: null,
    })),
    on(ContactActions.submitSuccess, (state) => ({
      ...state,
      status: 'success' as ContactStatus,
    })),
    on(ContactActions.submitFailure, (state, { error }) => ({
      ...state,
      status: 'error' as ContactStatus,
      error,
    })),
    on(ContactActions.resetForm, () => initialState),
  ),
});

export const {
  name: contactFeatureName,
  reducer: contactReducer,
  selectContactState,
  selectStatus,
  selectError,
} = contactFeature;
