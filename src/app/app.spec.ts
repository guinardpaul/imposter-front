import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { STOMP_CLIENT_FACTORY } from './core/ws/web-socket-token';
import { Client } from '@stomp/stompjs';

describe('App', () => {

  let clientMock: Partial<Client>;
  let factoryMock: () => Client;
  
  beforeEach(async () => {

    clientMock = {
      configure: vi.fn(),
      activate: vi.fn(),
      onConnect: undefined
    };

    factoryMock = vi.fn(() => clientMock as Client);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: STOMP_CLIENT_FACTORY,
          useValue: factoryMock
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, imposter-front');
  });
});
