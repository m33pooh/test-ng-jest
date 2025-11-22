import { ApplicationConfig, InjectionToken, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DataServiceInterface } from './models/data-service.interface';
import { MockApiService } from './services/mock-api.service';
import { ApiService } from './services/api.service';

export const DATA_SERVICE_TOKEN = new InjectionToken<DataServiceInterface>('DataService');

const USE_MOCK_API = true; // Toggle this to switch between Mock and Real API

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: DATA_SERVICE_TOKEN,
      useClass: USE_MOCK_API ? MockApiService : ApiService
    }
  ]
};
