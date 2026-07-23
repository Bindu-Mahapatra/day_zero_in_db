import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import {
  DemoUser,
  Persona
} from '../models/persona.model';

interface Account {
  user: DemoUser;
  password: string;
}

const STORAGE_KEY =
  'readypath-authenticated-username';

const ACCOUNTS: Record<string, Account> = {
  'hr@readypath.com': {
    password: 'Hr@123',

    user: {
      id: 'hr-001',
      username: 'hr@readypath.com',
      displayName: 'Priya Mehta',
      roleName: 'HR Business Partner',
      persona: 'HR',
      initials: 'PM'
    }
  },

  'manager@readypath.com': {
    password: 'Manager@123',

    user: {
      id: 'manager-001',
      username: 'manager@readypath.com',
      displayName: 'Arjun Rao',
      roleName: 'Engineering Manager',
      persona: 'MANAGER',
      initials: 'AR'
    }
  },

  'maya.sen@readypath.com': {
    password: 'Joiner@123',

    user: {
      id: 'joiner-001',
      username: 'maya.sen@readypath.com',
      displayName: 'Maya Sen',
      roleName: 'TDI Java Engineer',
      persona: 'JOINER',
      initials: 'MS',
      subjectJoinerId: 'J-1001'
    }
  }
};

const GUEST_USER: DemoUser = {
  id: 'guest',
  username: '',
  displayName: '',
  roleName: '',
  persona: 'HR',
  initials: ''
};

@Injectable({
  providedIn: 'root'
})
export class DemoSessionService {
  private readonly userState =
    signal<DemoUser | null>(
      this.restoreAuthenticatedUser()
    );

  readonly authenticatedUser =
    this.userState.asReadonly();

  readonly isAuthenticated = computed(
    () => this.userState() !== null
  );

  /**
   * Protected routes are guarded, so application
   * components will always receive a real user.
   */
  readonly currentUser = computed(
    () => this.userState() ?? GUEST_USER
  );

  readonly currentPersona = computed(
    () => this.currentUser().persona
  );

  login(
    username: string,
    password: string
  ): boolean {
    const normalizedUsername =
      username.trim().toLowerCase();

    const account =
      ACCOUNTS[normalizedUsername];

    if (
      !account ||
      account.password !== password
    ) {
      return false;
    }

    this.userState.set(account.user);

    this.writeStoredUsername(
      account.user.username
    );

    return true;
  }

  logout(): void {
    this.userState.set(null);

    const storage =
      this.getStorage();

    if (storage) {
      storage.removeItem(
        STORAGE_KEY
      );
    }
  }

  homeRoute(
    persona: Persona =
      this.currentPersona()
  ): string {
    switch (persona) {
      case 'HR':
        return '/hr/overview';

      case 'MANAGER':
        return '/manager/home';

      case 'JOINER':
        return '/me/home';
    }
  }

  hasRole(
    allowedRoles: Persona[]
  ): boolean {
    return (
      this.isAuthenticated() &&
      allowedRoles.includes(
        this.currentPersona()
      )
    );
  }

  /**
   * Retained so older reset calls do not break.
   */
  reset(): void {
    this.logout();
  }

  private restoreAuthenticatedUser():
    DemoUser | null {
    const storage =
      this.getStorage();

    if (!storage) {
      return null;
    }

    const username =
      storage.getItem(
        STORAGE_KEY
      );

    if (!username) {
      return null;
    }

    return ACCOUNTS[username]?.user ??
      null;
  }

  private writeStoredUsername(
    username: string
  ): void {
    const storage =
      this.getStorage();

    if (storage) {
      storage.setItem(
        STORAGE_KEY,
        username
      );
    }
  }

  private getStorage(): Storage | null {
    if (
      typeof localStorage === 'undefined' ||
      typeof localStorage.getItem !== 'function' ||
      typeof localStorage.setItem !== 'function' ||
      typeof localStorage.removeItem !== 'function'
    ) {
      return null;
    }

    return localStorage;
  }
}
