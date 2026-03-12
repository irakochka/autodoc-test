import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {environment} from '../environments/environment';
import {provideHttpClient} from '@angular/common/http';
import {BASE_API_URL} from '@shared/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: BASE_API_URL, useValue: environment.apiUrl },
    provideHttpClient()
  ]
};
