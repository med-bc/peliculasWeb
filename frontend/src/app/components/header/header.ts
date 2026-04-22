import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  showLoginModal = false;
  showRegisterModal = false;
  isLoggedIn = false;
  userName = '';

  abrirLogin() {
    this.showLoginModal = true;
  }

  abrirRegistro() {
    this.showRegisterModal = true;
  }

  cerrarLogin() {
    this.showLoginModal = false;
  }

  cerrarRegistro() {
    this.showRegisterModal = false;
  }

  iniciarSesion() {
    // Lógica de login
    this.isLoggedIn = true;
    this.userName = 'Usuario';
    this.cerrarLogin();
  }

  cerrarSesion() {
    this.isLoggedIn = false;
    this.userName = '';
  }

  registrarUsuario() {
    // Lógica de registro
    this.cerrarRegistro();
  }
}
