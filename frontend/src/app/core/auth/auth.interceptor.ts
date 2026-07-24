import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import {
  inject
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  catchError,
  throwError
} from 'rxjs';

import {
  API_BASE_URL
} from '../config/api.config';

import {
  SessionStoreService
} from './session-store.service';

export const authInterceptor:
  HttpInterceptorFn = (
    request,
    next
  ) => {
    const sessionStore =
      inject(SessionStoreService);

    const router =
      inject(Router);

    const token =
      sessionStore.token();

    const isBackendRequest =
      request.url.startsWith(
        API_BASE_URL
      );

    const securedRequest =
      token && isBackendRequest
        ? request.clone({
            setHeaders: {
              Authorization:
                `Bearer ${token}`
            }
          })
        : request;

    return next(securedRequest).pipe(
      catchError(error => {
        const isUnauthorized =
          error instanceof
            HttpErrorResponse &&
          error.status === 401;

        const isLoginRequest =
          request.url.endsWith(
            '/auth/login'
          );

        if (
          isUnauthorized &&
          !isLoginRequest
        ) {
          sessionStore.clear();

          void router.navigateByUrl(
            '/login'
          );
        }

        return throwError(
          () => error
        );
      })
    );
  };