import { Routes } from '@angular/router';
import { LobbyPage } from './features/lobby/components/lobby-page/lobby-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/lobby',
        pathMatch: 'full'
    },
    {
        path: 'lobby', 
        component: LobbyPage
    }
];
