import {
  CanActivateFn
} from '@angular/router';

import {
  inject
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  Persona
} from '../models/persona.model';

import {
  DemoSessionService
} from '../services/demo-session.service';

export const authGuard:
  CanActivateFn = (
    _route,
    state
  ) => {
    const session =
      inject(DemoSessionService);

    const router =
      inject(Router);

    if (session.isAuthenticated()) {
      return true;
    }

    return router.createUrlTree(
      ['/login'],
      {
        queryParams: {
          returnUrl: state.url
        }
      }
    );
  };

export const roleGuard:
  CanActivateFn = route => {
    const session =
      inject(DemoSessionService);

    const router =
      inject(Router);

    const allowedRoles =
      (
        route.data?.['roles'] ??
        []
      ) as Persona[];

    if (
      session.hasRole(allowedRoles)
    ) {
      return true;
    }

    return router.parseUrl(
      session.homeRoute()
    );
  };
