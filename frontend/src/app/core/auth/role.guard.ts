import {
  inject
} from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  map
} from 'rxjs';

import {
  Persona,
  homeRouteForPersona
} from './auth.models';

import {
  AuthService
} from './auth.service';

import {
  SessionStoreService
} from './session-store.service';

export const roleGuard:
  CanActivateFn = (
    route,
    state
  ) => {
    const authService =
      inject(AuthService);

    const sessionStore =
      inject(SessionStoreService);

    const router =
      inject(Router);

    const allowedRoles =
      (
        route.data['roles'] ?? []
      ) as Persona[];

    return authService
      .ensureSession()
      .pipe(
        map(authenticated => {
          if (!authenticated) {
            return router.createUrlTree(
              ['/login'],
              {
                queryParams: {
                  returnUrl: state.url
                }
              }
            );
          }

          const currentPersona =
            sessionStore.user()?.persona;

          if (
            currentPersona &&
            allowedRoles.includes(
              currentPersona
            )
          ) {
            return true;
          }

          return router.createUrlTree([
            currentPersona
              ? homeRouteForPersona(
                  currentPersona
                )
              : '/login'
          ]);
        })
      );
  };