import { Injectable, inject } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as uuid from 'uuid';
import { STOMP_CLIENT_FACTORY } from './web-socket-token';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private client!: Client;
  private playerId = uuid.v4();

  private clientFactory = inject(STOMP_CLIENT_FACTORY);

  connect() {
    this.client = this.clientFactory();

    this.client.configure({
      brokerURL: 'ws/localhost:8080/websocket',
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
}