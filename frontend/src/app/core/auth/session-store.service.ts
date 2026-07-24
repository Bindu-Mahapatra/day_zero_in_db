import {
  Injectable,
  computed,
  signal
} from '@angular/core';

import {
  AuthenticatedUser,
  LoginResponse
} from './auth.models';

const TOKEN_KEY =
  'readypath.session.token';

const USER_KEY =
  'readypath.session.user';

const EXPIRY_KEY =
  'readypath.session.expiresAt';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  private readonly tokenSignal =
    signal<string | null>(
      sessionStorage.getItem(TOKEN_KEY)
    );

  private readonly userSignal =
    signal<AuthenticatedUser | null>(
      this.readStoredUser()
    );

  private readonly expirySignal =
    signal<string | null>(
      sessionStorage.getItem(EXPIRY_KEY)
    );

  readonly token =
    this.tokenSignal.asReadonly();

  readonly user =
    this.userSignal.asReadonly();

  readonly expiresAt =
    this.expirySignal.asReadonly();

  readonly authenticated =
    computed(() =>
      Boolean(
        this.tokenSignal() &&
        this.userSignal()
      )
    );

  setSession(
    response: LoginResponse
  ): void {
    sessionStorage.setItem(
      TOKEN_KEY,
      response.token
    );

    sessionStorage.setItem(
      USER_KEY,
      JSON.stringify(response.user)
    );

    sessionStorage.setItem(
      EXPIRY_KEY,
      response.expiresAt
    );

    this.tokenSignal.set(
      response.token
    );

    this.userSignal.set(
      response.user
    );

    this.expirySignal.set(
      response.expiresAt
    );
  }

  setUser(
    user: AuthenticatedUser
  ): void {
    sessionStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );

    this.userSignal.set(user);
  }

  clear(): void {
    sessionStorage.removeItem(
      TOKEN_KEY
    );

    sessionStorage.removeItem(
      USER_KEY
    );

    sessionStorage.removeItem(
      EXPIRY_KEY
    );

    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.expirySignal.set(null);
  }

  private readStoredUser():
    AuthenticatedUser | null {
    const stored =
      sessionStorage.getItem(USER_KEY);

    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(
        stored
      ) as AuthenticatedUser;
    } catch {
      sessionStorage.removeItem(
        USER_KEY
      );

      return null;
    }
  }
}