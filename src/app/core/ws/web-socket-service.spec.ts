import { TestBed } from '@angular/core/testing';
import { Client, StompConfig } from '@stomp/stompjs';
import { WebSocketService } from './web-socket-service';
import { STOMP_CLIENT_FACTORY } from './web-socket-token';
import { Mock } from 'vitest';

describe('WebSocketService', () => {

  let service: WebSocketService;

  let clientMock: Partial<Client>;
  let factoryMock: () => Client;
  let configureSpy: Mock<(conf: StompConfig) => void>;

  beforeEach(() => {
    configureSpy = vi.fn();

    clientMock = {
      configure: configureSpy,
      activate: vi.fn(),
      onConnect: undefined
    };

    factoryMock = vi.fn(() => clientMock as Client);

    TestBed.configureTestingModule({
      providers: [
        WebSocketService,
        {
          provide: STOMP_CLIENT_FACTORY,
          useValue: factoryMock
        }
      ]
    });

    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should activate client', () => {
    service.connect();

    expect(factoryMock).toHaveBeenCalled();
    expect(clientMock.activate).toHaveBeenCalled();
  });

  it('should configure client', () => {
    service.connect();

    expect(clientMock.configure).toHaveBeenCalled();
  });

  it('should set onConnect handler', () => {
    service.connect();

    expect(clientMock.onConnect).toBeDefined();
  });

  it('should contains player-id header', () => {
    service.connect();

    const configArg = configureSpy.mock.calls[0][0];
    expect(configArg.connectHeaders).toBeDefined();
    expect(configArg.connectHeaders!['player-id']).toBe(service['playerId'])
  })

});