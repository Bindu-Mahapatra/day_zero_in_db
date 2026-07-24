import {
  Routes
} from '@angular/router';

import {
  authGuard
} from './core/auth/auth.guard';

import {
  roleGuard
} from './core/auth/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadComponent: () =>
      import(
        './features/login/login.component'
      ).then(
        module => module.LoginComponent
      )
  },
  {
    path: '',
    canActivate: [
      authGuard
    ],
    loadComponent: () =>
      import(
        './shell/app-shell/app-shell.component'
      ).then(module => module.AppShell),
    children: [
      {
        path: 'hr/overview',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['HR']
        },
        loadComponent: () =>
          import(
            './features/hr/hr-overview/hr-overview.component'
          ).then(
            module => module.HrOverviewComponent
          )
      },
      {
        path: 'hr/joiners',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['HR']
        },
        loadComponent: () =>
          import(
            './features/hr/joiner-portfolio/joiner-portfolio.component'
          ).then(
            module =>
              module.JoinerPortfolio
          )
      },
      {
        path: 'hr/joiners/:id',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['HR']
        },
        loadComponent: () =>
          import(
            './features/manager/joiner-360/joiner-360.component'
          ).then(
            module => module.Joiner360
          )
      },
      {
        path: 'manager/home',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['MANAGER']
        },
        loadComponent: () =>
          import(
            './features/manager/manager-home/manager-home.component'
          ).then(
            module => module.ManagerHome
          )
      },
      {
        path: 'manager/joiners/:id',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['MANAGER']
        },
        loadComponent: () =>
          import(
            './features/manager/joiner-360/joiner-360.component'
          ).then(
            module => module.Joiner360
          )
      },
      {
        path: 'manager/assistant',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['MANAGER']
        },
        loadComponent: () =>
          import(
            './features/manager/ask-readypath/ask-readypath.component'
          ).then(
            module => module.AskReadypath
          )
      },
      {
        path: 'me/home',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['JOINER']
        },
        loadComponent: () =>
          import(
            './features/joiner/joiner-home/joiner-home.component'
          ).then(
            module => module.JoinerHome
          )
      },
      {
        path: 'me/journey',
        canActivate: [
          authGuard,
          roleGuard
        ],
        data: {
          roles: ['JOINER']
        },
        loadComponent: () =>
          import(
            './features/joiner/joiner-journey/joiner-journey.component'
          ).then(
            module => module.JoinerJourney
          )
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
