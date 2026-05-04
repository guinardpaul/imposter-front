import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';

import { HomePage } from './home-page';
import { LobbyPage } from '../../lobby/components/lobby-page/lobby-page';
import { provideRouter } from '@angular/router';
import { LobbyService } from '../../lobby/lobby-service';
import { SettingsPage } from '../../settings/components/settings-page/settings-page';
import { signal } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let lobbyServiceMock: Partial<LobbyService>;

  beforeEach(async () => {

    lobbyServiceMock = {
      rooms: signal([]),
      initSnapshotSubscription: vi.fn(),
      initRoomSubscription: vi.fn(),
      createRoom: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([
          { path: '', component: HomePage },
          { path: 'lobby', component: LobbyPage },
          { path: 'settings', component: SettingsPage }
        ]),
        { provide: LobbyService, useValue: lobbyServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToLobby when clicking play button', () => {
    const spy = vi.spyOn(component, 'goToLobby');

    const button = fixture.nativeElement.querySelector('[id="play-button"]');

    button.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to lobby when clicking play', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/', HomePage);

    component.goToLobby();

    await harness.navigateByUrl('/lobby');
    expect(harness.routeNativeElement?.textContent)
      .toContain('Lobby');
  });

  it('should call goToSettings when clicking settings button', () => {
    const spy = vi.spyOn(component, 'goToSettings');

    const button = fixture.nativeElement.querySelector('[id="settings-button"]');

    button.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to settings when clicking settings', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/', HomePage);

    component.goToSettings();

    await harness.navigateByUrl('/settings');
    expect(harness.routeNativeElement?.textContent)
      .toContain('Paramètres');
  });

});
