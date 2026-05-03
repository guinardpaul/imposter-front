import { Component, inject, signal } from '@angular/core';
import { LobbyService } from '../../lobby-service';
import { CommonModule } from '@angular/common';
import { Room } from '../../../../shared/models/room';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lobby-page',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.css',
})
export class LobbyPage {

  private lobbyService = inject(LobbyService);
  rooms$!: Observable<Room[]>;
  _roomName = signal('');
  readonly roomName = this._roomName.asReadonly();

  playerName = 'Player1';
  playerId = 'abc-123';

  constructor() {
    this.rooms$ = this.lobbyService.rooms$;
  }

  createRoom() {
    if (!this.roomName.length) return;

    this.lobbyService.createRoom();
    this._roomName.set('');
  }

  joinRoom(roomId: string) {
    this.lobbyService.joinRoom(roomId);
  }
}
