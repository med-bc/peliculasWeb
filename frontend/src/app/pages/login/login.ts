import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email = '';
  contrasena = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({
      email: this.email,
      contrasena: this.contrasena
    }).subscribe({
      next: (res) => {
        this.authService.guardarToken(res.token);
        if (res.usuarioId && res.nombreUsuario && res.rol) {
          this.authService.guardarSesion(res.usuarioId, res.nombreUsuario, res.rol);
        }
        alert('Login exitoso');
        this.router.navigate(['/perfil']);
      },
      error: () => {
        alert('Error en login');
      }
    });
  }
}
