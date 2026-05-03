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

  it('should update roomName signal when typing in input', () => {
    const event = {
      target: {
        value: 'My Room'
      }
    } as unknown as Event;

    component.onInputRoomName(event);

    expect(component.roomName()).toBe('My Room');
  });

});
