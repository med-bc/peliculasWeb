import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email = '';
  contrasena = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({
      email: this.email,
      contrasena: this.contrasena
    }).subscribe({
      next: (res) => {
        this.authService.guardarToken(res.token);
        alert('Login exitoso');
      },
      error: () => {
        alert('Error en login');
      }
    });
  }
}