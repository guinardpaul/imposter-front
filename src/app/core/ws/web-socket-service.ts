import { Injectable, inject } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as uuid from 'uuid';
import { STOMP_CLIENT_FACTORY } from './web-socket-token';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private client!: Client;
  private playerId!: string;

  private clientFactory = inject(STOMP_CLIENT_FACTORY);

  connect() {
    const storedPlayerId = localStorage.getItem('playerId');
    if (storedPlayerId) {
      this.playerId = storedPlayerId;
    } else {
      this.playerId = uuid.v4();
      localStorage.setItem('playerId', this.playerId);
    }

    this.client = this.clientFactory();

    this.client.configure({
      brokerURL: environment.ws.brokerURL,
      reconnectDelay: 5000,
      connectHeaders: {
        "player-id": this.playerId
      },
      debug: (str) => console.log(str)
    });
    this.client.onConnect = () => {
      console.log('Connected');
    };

    this.client.activate();
  } 

  subscribe(destination: string, callback: (message: IMessage) => void) {
    this.client.subscribe(destination, callback);
  }

  publish(destination: string, body: unknown) {
    this.client.publish({ destination, body: JSON.stringify(body) });
  }

}