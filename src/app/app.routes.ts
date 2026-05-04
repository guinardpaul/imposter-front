import { Routes } from '@angular/router';
import { LobbyPage } from './features/lobby/components/lobby-page/lobby-page';
import { SettingsPage } from './features/settings/components/settings-page/settings-page';
import { HomePage } from './features/home/home-page/home-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'lobby', 
        component: LobbyPage
    },
    {
        path: 'settings',
        component: SettingsPage
    }
];
