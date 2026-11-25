import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import {
  authInterceptor,
  baseUrlInterceptor,
  errorHandlerInterceptor,
  loadingInterceptor,
} from '@core';
import { AUTH_PROVIDERS } from '@features/auth/auth.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor,
        errorHandlerInterceptor,
        loadingInterceptor,
        authInterceptor,
      ])
    ),
    ...AUTH_PROVIDERS,
  ],
};
