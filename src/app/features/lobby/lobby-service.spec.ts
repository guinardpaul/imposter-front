import { TestBed } from '@angular/core/testing';

import { LobbyService } from './lobby-service';
import { WebSocketService } from '../../core/ws/web-socket-service';

describe('LobbyService', () => {
  let service: LobbyService;
  let webSocketServiceMock: Partial<WebSocketService>;

  beforeEach(() => {
    webSocketServiceMock = {
      subscribe: vi.fn(),
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

  it('should subscribe to room updates', () => {
    service.initRoomSubscription();
    expect(webSocketServiceMock.subscribe).toHaveBeenCalledWith('/user/queue/game-info', expect.any(Function));
  });

  it('should publish create room message', () => {
    service.createRoom();
    expect(webSocketServiceMock.publish).toHaveBeenCalledWith('app/room.create', { roomName: 'New Room' });
  });

});
