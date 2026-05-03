import { Component, computed, inject, signal } from '@angular/core';
import { LobbyService } from '../../lobby-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lobby-page',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.css',
})
export class LobbyPage {

  private lobbyService = inject(LobbyService);
  
  rooms = this.lobbyService.rooms;
  roomName = signal('');

  playerName = 'Player1';
  playerId = 'abc-123';

  isValid = computed(() => this.roomName().trim().length > 0);

  constructor() {
    this.lobbyService.initSnapshotSubscription();
    this.lobbyService.initRoomSubscription();
  }

  onInputRoomName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.roomName.set(input.value);
  }

  createRoom() {
    const name = this.roomName();
    if (!name.trim()) return;

    this.lobbyService.createRoom(name);
    this.roomName.set('');
  }

  joinRoom(roomId: string) {
    this.lobbyService.joinRoom(roomId);
  }
}
