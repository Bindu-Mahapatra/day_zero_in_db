import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: AppShellComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'profile', loadComponent: () => import('./pages/profile-analysis/profile-analysis.component').then(m => m.ProfileAnalysisComponent) },
      { path: 'missing-info', loadComponent: () => import('./pages/missing-info/missing-info.component').then(m => m.MissingInfoComponent) },
      { path: 'journey', loadComponent: () => import('./pages/journey/journey.component').then(m => m.JourneyComponent) },
      { path: 'step/:id', loadComponent: () => import('./pages/step-details/step-details.component').then(m => m.StepDetailsComponent) },
      { path: 'policy-assistant', loadComponent: () => import('./pages/policy-assistant/policy-assistant.component').then(m => m.PolicyAssistantComponent) },
      { path: 'trainings', loadComponent: () => import('./pages/trainings/trainings.component').then(m => m.TrainingsComponent) },
      { path: 'access-requests', loadComponent: () => import('./pages/access-requests/access-requests.component').then(m => m.AccessRequestsComponent) },
      { path: 'readiness', loadComponent: () => import('./pages/readiness-score/readiness-score.component').then(m => m.ReadinessScoreComponent) },
      { path: 'tasks', loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent) },
      { path: 'manager', loadComponent: () => import('./pages/manager-view/manager-view.component').then(m => m.ManagerViewComponent) },
      { path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent) },
      { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) },
      { path: 'help', loadComponent: () => import('./pages/help-support/help-support.component').then(m => m.HelpSupportComponent) }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
