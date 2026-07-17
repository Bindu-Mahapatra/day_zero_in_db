import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = 'john.smith@db.com';
  password = 'demo';

  constructor(private readonly router: Router) {}

  signIn(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
