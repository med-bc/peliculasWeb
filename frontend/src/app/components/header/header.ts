import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  showLoginModal = false;
  showRegisterModal = false;
  showUserMenu = false;
  isLoggedIn = false;
  userName = '';

  // Login fields
  loginEmail = '';
  loginContrasena = '';
  loginError = '';

  // Register fields
  regNombres = '';
  regApellidos = '';
  regNombreUsuario = '';
  regEmail = '';
  regContrasena = '';
  regCelular = '';
  regError = '';
  regSuccess = '';

  constructor(private authService: AuthService, private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = this.authService.obtenerToken();
    this.isLoggedIn = !!token;
    this.userName = localStorage.getItem('nombreUsuario') || '';
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  abrirLogin() {
    this.loginEmail = '';
    this.loginContrasena = '';
    this.loginError = '';
    this.showLoginModal = true;
  }

  abrirRegistro() {
    this.regNombres = '';
    this.regApellidos = '';
    this.regNombreUsuario = '';
    this.regEmail = '';
    this.regContrasena = '';
    this.regCelular = '';
    this.regError = '';
    this.regSuccess = '';
    this.showRegisterModal = true;
  }

  cerrarLogin() {
    this.showLoginModal = false;
  }

  cerrarRegistro() {
    this.showRegisterModal = false;
  }

  iniciarSesion() {
    if (!this.loginEmail || !this.loginContrasena) {
      this.loginError = 'Por favor completa todos los campos';
      return;
    }

    this.authService.login({
      email: this.loginEmail,
      contrasena: this.loginContrasena
    }).subscribe({
      next: (res) => {
        this.authService.guardarToken(res.token);
        if (res.usuarioId && res.nombreUsuario && res.rol) {
          this.authService.guardarSesion(res.usuarioId, res.nombreUsuario, res.rol);
        }
        this.isLoggedIn = true;
        this.userName = res.nombreUsuario;
        this.cerrarLogin();
        this.router.navigate(['/perfil']);
      },
      error: () => {
        this.loginError = 'Email o contraseña incorrectos';
      }
    });
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/home']);
  }

  registrarUsuario() {
    if (!this.regNombres || !this.regApellidos || !this.regNombreUsuario || !this.regEmail || !this.regContrasena) {
      this.regError = 'Por favor completa todos los campos obligatorios';
      return;
    }

    const usuario = {
      nombres: this.regNombres,
      apellidos: this.regApellidos,
      nombreUsuario: this.regNombreUsuario,
      email: this.regEmail,
      contrasena: this.regContrasena,
      celular: this.regCelular,
      rol: 'USER'
    };

    this.authService.register(usuario).subscribe({
      next: () => {
        this.regSuccess = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        setTimeout(() => {
          this.cerrarRegistro();
          this.abrirLogin();
        }, 2000);
      },
      error: () => {
        this.regError = 'El email o nombre de usuario ya existen';
      }
    });
  }
}
