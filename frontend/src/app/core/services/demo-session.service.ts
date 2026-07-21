import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DemoUser, Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class DemoSessionService {
  private readonly users: Record<Persona, DemoUser> = {
    HR: {
      id: 'hr-001',
      displayName: 'Priya Mehta',
      roleName: 'HR Business Partner',
      persona: 'HR',
      initials: 'PM'
    },
    MANAGER: {
      id: 'manager-001',
      displayName: 'Bindu Mahapatra',
      roleName: 'Engineering Manager',
      persona: 'MANAGER',
      initials: 'BM'
    },
    JOINER: {
      id: 'joiner-001',
      displayName: 'Maya Sen',
      roleName: 'TDI Java Engineer',
      persona: 'JOINER',
      initials: 'MS',
      subjectJoinerId: 'J-1001'
    }
  };

  readonly currentPersona = signal<Persona>('HR');

  readonly currentUser = computed(
    () => this.users[this.currentPersona()]
  );

  constructor(private readonly router: Router) {}

  selectPersona(persona: Persona): void {
    this.currentPersona.set(persona);

    const routeByPersona: Record<Persona, string> = {
      HR: '/hr/overview',
      MANAGER: '/manager/home',
      JOINER: '/me/home'
    };

    void this.router.navigateByUrl(routeByPersona[persona]);
  }

  reset(): void {
    this.currentPersona.set('HR');
    void this.router.navigateByUrl('/demo-login');
  }
}