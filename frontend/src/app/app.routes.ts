import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo-login'
  },
  {
    path: 'demo-login',
    loadComponent: () =>
      import('./features/demo-login/demo-login.component')
        .then(module => module.DemoLoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./shell/app-shell/app-shell.component')
        .then(module => module.AppShellComponent),
    children: [
      {
        path: 'hr/overview',
        loadComponent: () =>
          import('./features/hr/hr-overview/hr-overview.component')
            .then(module => module.HrOverviewComponent)
      },
      {
        path: 'hr/joiners',
        loadComponent: () =>
          import('./features/hr/joiner-portfolio/joiner-portfolio.component')
            .then(module => module.JoinerPortfolio)
      },
      {
        path: 'hr/joiners/:id',
        loadComponent: () =>
            import('./features/manager/joiner-360/joiner-360.component')
            .then(module => module.Joiner360)
    },
      {
        path: 'manager/home',
        loadComponent: () =>
          import('./features/manager/manager-home/manager-home.component')
            .then(module => module.ManagerHome)
      },
      {
        path: 'manager/joiners/:id',
        loadComponent: () =>
          import('./features/manager/joiner-360/joiner-360.component')
            .then(module => module.Joiner360)
      },
      {
        path: 'manager/assistant',
        loadComponent: () =>
          import('./features/manager/ask-readypath/ask-readypath.component')
            .then(module => module.AskReadypath)
      },
      {
        path: 'me/home',
        loadComponent: () =>
          import('./features/joiner/joiner-home/joiner-home.component')
            .then(module => module.JoinerHome)
      },
      {
        path: 'me/journey',
        loadComponent: () =>
          import('./features/joiner/joiner-journey/joiner-journey.component')
            .then(module => module.JoinerJourney)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'demo-login'
  }
];