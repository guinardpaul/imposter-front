import { Injectable, inject, signal } from '@angular/core';
import { WebSocketService } from '../../core/ws/web-socket-service';
import { Room } from '../../shared/models/room';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {

  private webSocketService = inject(WebSocketService);

  rooms = signal<Room[]>([]);

  initSnapshotSubscription() {
    this.webSocketService.subscribe('/user/queue/game-info', (message) => {
      const rooms = JSON.parse(message.body) as Room[];
      this.rooms.set(rooms);
    });
  }

  initRoomSubscription() {
    this.webSocketService.subscribe('/topic/room/**', (message) => {
      const event = JSON.parse(message.body) as Room;
      this.handleRoomEvent(event);
    });
  }

  handleRoomEvent(event: Room) {
    const current = this.rooms();

    const index = current.findIndex(r => r.roomId === event.roomId);

    // Create
    if (index === -1) {
      this.rooms.set([...current, event]);
      return;
    }

    // Update
    const updated = [...current];
    updated[index] = event;

    this.rooms.set(updated);
  }

  createRoom(roomName: string) {
    this.webSocketService.publish('/app/room.create', { roomName: roomName });
  }

  joinRoom(roomId: string) {
    this.webSocketService.publish('/app/room.join', { roomId: roomId, playerName: 'test' })
  }

}
