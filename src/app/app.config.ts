import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { STOMP_CLIENT_FACTORY } from './core/ws/web-socket-token';
import { Client } from '@stomp/stompjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { 
      provide: STOMP_CLIENT_FACTORY, 
      useValue: () => new Client() 
    }
  ]
};
