import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPage } from './lobby-page';
import { LobbyService } from '../../lobby-service';

describe('LobbyPage', () => {
  let component: LobbyPage;
  let fixture: ComponentFixture<LobbyPage>;
  let lobbyServiceMock: Partial<LobbyService>;

  beforeEach(async () => {
    lobbyServiceMock = {
      rooms$: undefined,
      initRoomSubscription: vi.fn(),
      createRoom: vi.fn() 
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

  
});
