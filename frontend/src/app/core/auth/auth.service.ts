import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  Observable,
  catchError,
  finalize,
  map,
  of,
  shareReplay,
  tap
} from 'rxjs';

import {
  API_BASE_URL
} from '../config/api.config';

import {
  AuthenticatedUser,
  LoginRequest,
  LoginResponse
} from './auth.models';

import {
  SessionStoreService
} from './session-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http =
    inject(HttpClient);

  private readonly router =
    inject(Router);

  private readonly sessionStore =
    inject(SessionStoreService);

  private sessionVerified = false;

  private verificationRequest:
    Observable<boolean> | null = null;

  login(
    request: LoginRequest
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${API_BASE_URL}/auth/login`,
        request
      )
      .pipe(
        tap(response => {
          this.sessionStore.setSession(
            response
          );

          this.sessionVerified = true;
        })
      );
  }

  ensureSession():
    Observable<boolean> {
    if (!this.sessionStore.token()) {
      this.sessionVerified = false;
      return of(false);
    }

    if (
      this.sessionVerified &&
      this.sessionStore.user()
    ) {
      return of(true);
    }

    if (this.verificationRequest) {
      return this.verificationRequest;
    }

    this.verificationRequest =
      this.http
        .get<AuthenticatedUser>(
          `${API_BASE_URL}/auth/me`
        )
        .pipe(
          tap(user => {
            this.sessionStore.setUser(
              user
            );

            this.sessionVerified = true;
          }),

          map(() => true),

          catchError(() => {
            this.sessionStore.clear();
            this.sessionVerified = false;

            return of(false);
          }),

          finalize(() => {
            this.verificationRequest =
              null;
          }),

          shareReplay({
            bufferSize: 1,
            refCount: false
          })
        );

    return this.verificationRequest;
  }

  logout(): Observable<void> {
    if (!this.sessionStore.token()) {
      this.clearAndNavigate();

      return of(undefined);
    }

    return this.http
      .post<void>(
        `${API_BASE_URL}/auth/logout`,
        {}
      )
      .pipe(
        /*
         * Local logout must still complete when
         * the backend session is already expired.
         */
        catchError(() => of(undefined)),

        finalize(() => {
          this.clearAndNavigate();
        })
      );
  }

  clearLocalSession(): void {
    this.sessionVerified = false;
    this.sessionStore.clear();
  }

  private clearAndNavigate(): void {
    this.clearLocalSession();

    void this.router.navigateByUrl(
      '/login'
    );
  }
}