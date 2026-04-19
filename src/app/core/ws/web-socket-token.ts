import { InjectionToken } from '@angular/core';
import { Client } from '@stomp/stompjs';

export const STOMP_CLIENT_FACTORY =
  new InjectionToken<() => Client>('STOMP_CLIENT_FACTORY');