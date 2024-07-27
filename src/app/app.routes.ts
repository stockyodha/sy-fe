import { Routes } from '@angular/router';

import { CanActivateTeam } from './shared/gaurds/auth.gaurd';

export const routes: Routes = [
    {
        path: 'onboarding',
        loadChildren: () => import('./modules/onboarding/onboarding.module').then(m => m.OnboardingModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [CanActivateTeam]
    },
    {
        path: '',
        redirectTo: 'onboarding',
        pathMatch: 'full'
    }
];
