import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  DemoSessionService
} from '../../core/services/demo-session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {
  private readonly router =
    inject(Router);

  private readonly session =
    inject(DemoSessionService);

  username = '';
  password = '';

  readonly showPassword =
    signal(false);

  readonly errorMessage =
    signal('');

  constructor() {
    if (
      this.session.isAuthenticated()
    ) {
      void this.router.navigateByUrl(
        this.session.homeRoute()
      );
    }
  }

  signIn(): void {
    this.errorMessage.set('');

    if (
      !this.username.trim() ||
      !this.password
    ) {
      this.errorMessage.set(
        'Enter your username and password.'
      );

      return;
    }

    const authenticated =
      this.session.login(
        this.username,
        this.password
      );

    if (!authenticated) {
      this.errorMessage.set(
        'The username or password is incorrect.'
      );

      return;
    }

    void this.router.navigateByUrl(
      this.session.homeRoute()
    );
  }

  togglePassword(): void {
    this.showPassword.update(
      visible => !visible
    );
  }
}
