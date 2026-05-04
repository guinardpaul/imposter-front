import { Component, computed, inject, signal } from '@angular/core';
import { LobbyService } from '../../lobby-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AVATARS } from '../../../../shared/models/avatars';

@Component({
  selector: 'app-lobby-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.css',
})
export class LobbyPage {

  private lobbyService = inject(LobbyService);

  rooms = this.lobbyService.rooms;
  roomName = signal('Salle 1');
  playerName = signal('');
  playerId = localStorage.getItem('playerId');
  selectedAvatar = signal(this.getRandomAvatar());
  avatars = AVATARS;
  isAvatarModalOpen = signal(false);


  isValid = computed(() => this.roomName().trim().length > 0);

  constructor() {
    this.lobbyService.initSnapshotSubscription();
    this.lobbyService.initRoomSubscription();

    this.selectedAvatar.set(this.getRandomAvatar());
  }

  openAvatarModal() {
    this.isAvatarModalOpen.set(true);
  }

  closeAvatarModal() {
    this.isAvatarModalOpen.set(false);
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar.set(avatar);
    this.closeAvatarModal();
  }

  getRandomAvatar(): string {
    const index = Math.floor(Math.random() * AVATARS.length);
    return AVATARS[index];
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
