import { Inject, Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as uuid from 'uuid';
import { STOMP_CLIENT_FACTORY } from './web-socket-token';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  
  private client!: Client;
  private playerId: string;

  constructor(@Inject(STOMP_CLIENT_FACTORY)
    private clientFactory: () => Client) {
    this.playerId = uuid.v4().toString();
  }

  connect() {
    this.client = this.clientFactory();

    this.client.configure({
      brokerURL: 'ws/localhost:8080/websocket',
      reconnectDelay: 5000,
      connectHeaders: { "player-id": this.playerId },
      debug: (str) => console.log(str)
    });

    this.client.onConnect = () => {
      console.log('Connected');
    };

    
    this.client.activate();
  }

}