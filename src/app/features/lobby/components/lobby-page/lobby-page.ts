import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LobbyService } from '../../lobby-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lobby-page',
  imports: [ CommonModule, MatButton ],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.css',
})
export class LobbyPage {

    private lobbyService = inject(LobbyService);

    constructor() {
      this.lobbyService.initRoomSubscription();
    }

    create() {
      this.lobbyService.createRoom();
    }
}
