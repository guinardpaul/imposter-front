import { TestBed } from '@angular/core/testing';
import { Client } from '@stomp/stompjs';
import { WebSocketService } from './web-socket-service';
import { STOMP_CLIENT_FACTORY } from './web-socket-token';

describe('WebSocketService', () => {

  let service: WebSocketService;

  let clientMock: Partial<Client>;
  let factoryMock: () => Client;

  beforeEach(() => {

    clientMock = {
      configure: vi.fn(),
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

});