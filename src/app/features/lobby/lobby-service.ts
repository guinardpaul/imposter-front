import { Injectable, inject } from '@angular/core';
import { WebSocketService } from '../../core/ws/web-socket-service';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../shared/models/room';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {

  private webSocketService = inject(WebSocketService);
  private roomsSubject = new BehaviorSubject<Room[]>([]);
  rooms$ = this.roomsSubject.asObservable();

  initRoomSubscription() {
    this.webSocketService.subscribe('/user/queue/game-info', (message) => {
      const rooms = JSON.parse(message.body) as Room[];
      this.roomsSubject.next(rooms);
    });
  }

  createRoom() {
    this.webSocketService.publish('app/room.create', { roomName: 'New Room' });
  }

  joinRoom(roomId: string) {
    this.webSocketService.publish('app/room.join', { roomId: roomId, playerName: 'test'})
  }

}
