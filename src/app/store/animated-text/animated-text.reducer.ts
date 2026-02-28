import { createFeature, createReducer, on } from '@ngrx/store';
import { AnimatedTextActions } from './animated-text.actions';

export const PHRASES = [
  'Senior Frontend Engineer',
  'Angular Architect',
  'NgRx & RxJS Specialist',
  'Cross-Platform Developer',
  'Product Owner',
];

export interface AnimatedTextState {
  phrases: string[];
  currentPhraseIndex: number;
  displayText: string;
  isDeleting: boolean;
}

const initialState: AnimatedTextState = {
  phrases: PHRASES,
  currentPhraseIndex: 0,
  displayText: '',
  isDeleting: false,
};

export const animatedTextFeature = createFeature({
  name: 'animatedText',
  reducer: createReducer(
    initialState,
    on(AnimatedTextActions.setDisplayText, (state, { text }) => ({
      ...state,
      displayText: text,
    })),
    on(AnimatedTextActions.toggleDeleting, (state, { isDeleting }) => ({
      ...state,
      isDeleting,
    })),
    on(AnimatedTextActions.advancePhrase, (state) => ({
      ...state,
      currentPhraseIndex: (state.currentPhraseIndex + 1) % state.phrases.length,
      isDeleting: false,
    })),
  ),
});

export const {
  name: animatedTextFeatureName,
  reducer: animatedTextReducer,
  selectAnimatedTextState,
  selectDisplayText,
  selectCurrentPhraseIndex,
  selectIsDeleting,
  selectPhrases,
} = animatedTextFeature;
