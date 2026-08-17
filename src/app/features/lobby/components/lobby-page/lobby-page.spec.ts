import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPage } from './lobby-page';
import { LobbyService } from '../../lobby-service';
import { signal } from '@angular/core';

describe('LobbyPage', () => {
  let component: LobbyPage;
  let fixture: ComponentFixture<LobbyPage>;
  let lobbyServiceMock: Partial<LobbyService>;

  beforeEach(async () => {
    lobbyServiceMock = {
      rooms: signal([]),
      initSnapshotSubscription: vi.fn(),
      initRoomSubscription: vi.fn(),
      createRoom: vi.fn(),
      joinRoom: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LobbyPage],
      providers: [
        { provide: LobbyService, useValue: lobbyServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LobbyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send joinRoom request with roomId', () => {
    const id = 'aze-123';

    component.joinRoom(id);

    expect(lobbyServiceMock.joinRoom).toHaveBeenCalledWith(id);
  });

  it('should not createRoom if name is empty', () => {
    component.roomName.set('');
    component.createRoom();

    expect(lobbyServiceMock.createRoom).toHaveBeenCalledTimes(0);
  });

  it('should createRoom if name is not empty', () => {
    component.roomName.set('Room Name');
    component.createRoom();

    expect(lobbyServiceMock.createRoom).toHaveBeenCalledWith('Room Name');
  });

  it('should open avatar modal', () => {
    component.openAvatarModal();

    expect(component.isAvatarModalOpen()).toBe(true);
  });

  it('should close avatar modal', () => {
    component.isAvatarModalOpen.set(true);

    component.closeAvatarModal();

    expect(component.isAvatarModalOpen()).toBe(false);
  });

  it('should select avatar and close modal', () => {
    component.isAvatarModalOpen.set(true);

    component.selectAvatar('🐸');

    expect(component.selectedAvatar()).toBe('🐸');
    expect(component.isAvatarModalOpen()).toBe(false);
  });

  it('should open avatar modal on real click', () => {

  const button: HTMLButtonElement =
    fixture.nativeElement.querySelector('[data-testid="avatar-button"]');

  button.click();

  fixture.detectChanges();

  expect(component.isAvatarModalOpen()).toBe(true);
});

it('should close modal when clicking overlay', () => {

  component.isAvatarModalOpen.set(true);
  fixture.detectChanges();

  const overlay: HTMLElement =
    fixture.nativeElement.querySelector('[data-testid="close-avatar-modal"]');

  overlay.click();

  expect(component.isAvatarModalOpen()).toBe(false);
});

it('should close modal when pressing Escape key', () => {

  component.isAvatarModalOpen.set(true);
  fixture.detectChanges();

  const overlay: HTMLElement =
    fixture.nativeElement.querySelector('[data-testid="close-avatar-modal"]');

  overlay.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape' })
  );

  expect(component.isAvatarModalOpen()).toBe(false);
});

 it('should disable button when roomName is empty', () => {

  component.roomName.set('');

  fixture.detectChanges();

  const button: HTMLButtonElement =
    fixture.nativeElement.querySelector('[data-testid="create-room-button"]');

  expect(button.disabled).toBe(true);
});

it('should enable button when roomName is valid', () => {

  component.roomName.set('My Room');

  fixture.detectChanges();

  const button: HTMLButtonElement =
    fixture.nativeElement.querySelector('[data-testid="create-room-button"]');

  expect(button.disabled).toBe(false);
});

it('should call createRoom on click when enabled', () => {

  component.roomName.set('My Room');

  const spy = vi.spyOn(component, 'createRoom');

  fixture.detectChanges();

  const button: HTMLButtonElement =
    fixture.nativeElement.querySelector('[data-testid="create-room-button"]');

  button.click();

  expect(spy).toHaveBeenCalled();
});

it('should not call createRoom when button is disabled', () => {

  component.roomName.set('');

  const spy = vi.spyOn(component, 'createRoom');

  fixture.detectChanges();

  const button: HTMLButtonElement =
    fixture.nativeElement.querySelector('[data-testid="create-room-button"]');

  button.click();

  expect(spy).not.toHaveBeenCalled();
});

});
