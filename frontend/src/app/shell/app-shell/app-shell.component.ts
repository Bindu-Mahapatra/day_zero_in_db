import { Component, computed, inject } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import {
  DemoSessionService
} from '../../core/services/demo-session.service';
import { Persona } from '../../core/models/persona.model';

interface NavigationItem {
  label: string;
  route: string;
  shortLabel: string;
}

const NAVIGATION: Record<Persona, NavigationItem[]> = {
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
export class AppShellComponent {
  readonly session = inject(DemoSessionService);

  readonly currentUser = this.session.currentUser;
  readonly currentPersona = this.session.currentPersona;

  readonly navigationItems = computed(
    () => NAVIGATION[this.currentPersona()]
  );

  changePersona(persona: Persona): void {
    this.session.selectPersona(persona);
  }

  exitDemo(): void {
    this.session.reset();
  }
}