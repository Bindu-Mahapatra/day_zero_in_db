import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DemoSessionService } from '../../core/services/demo-session.service';
import { Persona } from '../../core/models/persona.model';

@Component({
  selector: 'app-demo-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './demo-login.component.html',
  styleUrl: './demo-login.component.scss'
})
export class DemoLoginComponent {
  private readonly session = inject(DemoSessionService);

  selectPersona(persona: Persona): void {
    this.session.selectPersona(persona);
  }
}