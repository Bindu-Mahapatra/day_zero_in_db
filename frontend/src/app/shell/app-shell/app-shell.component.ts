import {
  Component,
  computed,
  inject
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import {
  AuthService
} from '../../core/auth/auth.service';

import {
  Persona,
  homeRouteForPersona
} from '../../core/auth/auth.models';

import {
  SessionStoreService
} from '../../core/auth/session-store.service';

interface NavigationItem {
  label: string;
  route: string;
  shortLabel: string;
}

const NAVIGATION:
  Record<
    Persona,
    NavigationItem[]
  > = {
    HR: [
      {
        label: 'Readiness Overview',
        route: '/hr/overview',
        shortLabel: 'OV'
      },
      {
        label: 'Joiner Portfolio',
        route: '/hr/joiners',
        shortLabel: 'JP'
      }
    ],

    MANAGER: [
      {
        label: 'Manager Home',
        route: '/manager/home',
        shortLabel: 'MH'
      },
      {
        label: 'Ask ReadyPath',
        route: '/manager/assistant',
        shortLabel: 'AI'
      }
    ],

    JOINER: [
      {
        label: 'My Home',
        route: '/me/home',
        shortLabel: 'HM'
      },
      {
        label: 'My Journey',
        route: '/me/journey',
        shortLabel: 'JR'
      }
    ]
  };

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShell {
  private readonly authService =
    inject(AuthService);

  private readonly sessionStore =
    inject(SessionStoreService);

  readonly currentUser =
    this.sessionStore.user;

  readonly currentPersona =
    computed(
      () =>
        this.currentUser()?.persona ??
        'HR'
    );

  readonly navigationItems =
    computed(
      () =>
        NAVIGATION[
          this.currentPersona()
        ]
    );

  readonly homeRoute =
    computed(
      () =>
        homeRouteForPersona(
          this.currentPersona()
        )
    );

  logout(): void {
    this.authService
      .logout()
      .subscribe();
  }
}
