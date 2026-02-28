import { createFeature, createReducer, on } from '@ngrx/store';
import { UiActions } from './ui.actions';

export interface UiState {
  activeSection: string;
  mobileMenuOpen: boolean;
  scrollY: number;
}

const initialState: UiState = {
  activeSection: 'home',
  mobileMenuOpen: false,
  scrollY: 0,
};

export const uiFeature = createFeature({
  name: 'ui',
  reducer: createReducer(
    initialState,
    on(UiActions.setActiveSection, (state, { section }) => ({
      ...state,
      activeSection: section,
    })),
    on(UiActions.toggleMobileMenu, (state) => ({
      ...state,
      mobileMenuOpen: !state.mobileMenuOpen,
    })),
    on(UiActions.closeMobileMenu, (state) => ({
      ...state,
      mobileMenuOpen: false,
    })),
    on(UiActions.updateScrollPosition, (state, { scrollY }) => ({
      ...state,
      scrollY,
    })),
  ),
});

export const {
  name: uiFeatureName,
  reducer: uiReducer,
  selectUiState,
  selectActiveSection,
  selectMobileMenuOpen,
  selectScrollY,
} = uiFeature;
