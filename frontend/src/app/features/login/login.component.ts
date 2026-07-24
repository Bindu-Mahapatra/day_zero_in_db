import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  finalize
} from 'rxjs';

import {
  AuthService
} from '../../core/auth/auth.service';

import {
  SessionStoreService
} from '../../core/auth/session-store.service';

import {
  homeRouteForPersona
} from '../../core/auth/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl:
    './login.component.html',

  styleUrl:
    './login.component.scss'
})
export class LoginComponent
  implements OnInit {

  private readonly formBuilder =
    inject(FormBuilder);

  private readonly authService =
    inject(AuthService);

  private readonly sessionStore =
    inject(SessionStoreService);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);

  readonly loading =
    signal(false);

  readonly errorMessage =
    signal('');

  readonly loginForm =
    this.formBuilder.nonNullable.group({
      username: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]
    });

  ngOnInit(): void {
    this.authService
      .ensureSession()
      .subscribe(authenticated => {
        if (!authenticated) {
          return;
        }

        const persona =
          this.sessionStore
            .user()
            ?.persona;

        if (persona) {
          void this.router.navigateByUrl(
            homeRouteForPersona(
              persona
            )
          );
        }
      });
  }

  submit(): void {
    this.errorMessage.set('');

    if (
      this.loginForm.invalid ||
      this.loading()
    ) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.authService
      .login(
        this.loginForm.getRawValue()
      )
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: response => {
          const requestedReturnUrl =
            this.route.snapshot
              .queryParamMap
              .get('returnUrl');

          const destination =
            requestedReturnUrl?.startsWith('/')
              ? requestedReturnUrl
              : homeRouteForPersona(
                  response.user.persona
                );

          void this.router.navigateByUrl(
            destination
          );
        },

        error: error => {
          this.handleLoginError(
            error
          );
        }
      });
  }

  private handleLoginError(
    error: unknown
  ): void {
    if (
      error instanceof
        HttpErrorResponse &&
      error.status === 401
    ) {
      this.errorMessage.set(
        'The username or password is incorrect.'
      );

      return;
    }

    this.errorMessage.set(
      'ReadyPath could not sign you in. Check that the backend is running and try again.'
    );
  }
}