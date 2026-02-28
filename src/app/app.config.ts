import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { uiReducer } from './store/ui/ui.reducer';
import { animatedTextReducer } from './store/animated-text/animated-text.reducer';
import { contactReducer } from './store/contact/contact.reducer';
import { UiEffects } from './store/ui/ui.effects';
import { AnimatedTextEffects } from './store/animated-text/animated-text.effects';
import { ContactEffects } from './store/contact/contact.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      ui: uiReducer,
      animatedText: animatedTextReducer,
      contact: contactReducer,
    }),
    provideEffects([UiEffects, AnimatedTextEffects, ContactEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      name: 'Ivan Mihaylov Portfolio',
    }),
  ],
};

