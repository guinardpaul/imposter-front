import { TestBed } from '@angular/core/testing';

import { LobbyService } from './lobby-service';
import { WebSocketService } from '../../core/ws/web-socket-service';
import { IMessage } from '@stomp/stompjs';
import { Room } from '../../shared/models/room';

describe('LobbyService', () => {
  let service: LobbyService;
  let webSocketServiceMock: Partial<WebSocketService>;
  let subscribeCallback!: (message: any) => void;

  beforeEach(() => {
    webSocketServiceMock = {
      subscribe: vi.fn((topic: string, callback: any) => {
        subscribeCallback = callback;
      }),
      publish: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LobbyService,
        { provide: WebSocketService, useValue: webSocketServiceMock }
      ]
    });
    service = TestBed.inject(LobbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe to room snapshot', () => {
    service.initSnapshotSubscription();
    expect(webSocketServiceMock.subscribe).toHaveBeenCalledWith('/user/queue/game-info', expect.any(Function));
  });

  it('should subscribe to room updates', () => {
    service.initRoomSubscription();
    expect(webSocketServiceMock.subscribe).toHaveBeenCalledWith('/topic/room/**', expect.any(Function));
  });

  it('should update rooms when snapshot message arrives', () => {
    service.initSnapshotSubscription();

    const fakeRooms: Room[] = [
      {
        roomId: '1',
        roomName: 'Test1',
        playerViewList: []
      },
      {
        roomId: '2',
        roomName: 'Test2',
        playerViewList: []
      }
    ];

    const message = {
      body: JSON.stringify(fakeRooms)
    };

    // when
    subscribeCallback(message);
    // then
    expect(service.rooms().length).toBe(2);
    expect(service.rooms()[0].roomId).toBe('1');
    expect(service.rooms()[0].roomName).toBe('Test1');
  });

   it('should update one room when update event message arrives - on create', () => {
    service.initRoomSubscription();

    const fakeRoom: Room = 
      {
        roomId: '1',
        roomName: 'Test1',
        playerViewList: []
      };

    const message = {
      body: JSON.stringify(fakeRoom)
    };

    // when
    subscribeCallback(message);
    // then
    expect(service.rooms().length).toBe(1);
    expect(service.rooms()[0].roomId).toBe('1');
    expect(service.rooms()[0].roomName).toBe('Test1');
  });

  it('should update one room when update event message arrives - on update', () => {
    service.initRoomSubscription();
    
    const initRoom: Room[] = [
      {
        roomId: '1',
        roomName: 'Test1',
        playerViewList: []
      }
    ];
    service.rooms.set(initRoom);

    const updateRoom: Room = {
      roomId: '1',
      roomName: 'Test1',
      playerViewList: [
        {
          id: '2',
          name: 'name'
        }
      ]
    }
    const message = {
      body: JSON.stringify(updateRoom)
    };

    // when
    subscribeCallback(message);
    // then
    expect(service.rooms().length).toBe(1);
    expect(service.rooms()[0].roomId).toBe('1');
    expect(service.rooms()[0].roomName).toBe('Test1');
    expect(service.rooms()[0].playerViewList.length).toBe(1);
    expect(service.rooms()[0].playerViewList[0].id).toBe('2');
    expect(service.rooms()[0].playerViewList[0].name).toBe('name');
  });

  it('should publish create room message', () => {
    service.createRoom('New Room');
    expect(webSocketServiceMock.publish).toHaveBeenCalledWith('/app/room.create', { roomName: 'New Room' });
  });

  it('should publish join room message', () => {
    const roomId = '123';

    service.joinRoom(roomId);

    expect(webSocketServiceMock.publish).toHaveBeenCalledWith('/app/room.join', { roomId: roomId, playerName: 'test' });
  });

});
