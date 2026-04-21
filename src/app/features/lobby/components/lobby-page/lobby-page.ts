import { Component } from '@angular/core';
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

    private lobbyService: LobbyService;

    constructor(LobbyService: LobbyService) {
        this.lobbyService = LobbyService;
        this.lobbyService.initRoomSubscription();
    }

    create() {
      this.lobbyService.createRoom();
    }
}
