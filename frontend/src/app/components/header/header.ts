import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CatalogoService, Pelicula, Serie } from '../../services/catalogo';

interface ResultadoBusqueda {
  id: number;
  titulo: string;
  tipo: 'pelicula' | 'serie';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  showLoginModal = false;
  showRegisterModal = false;
  showUserMenu = false;
  isLoggedIn = false;
  userName = '';

  // Buscador
  terminoBusqueda = '';
  resultados: ResultadoBusqueda[] = [];
  showSugerencias = false;
  peliculas: Pelicula[] = [];
  series: Serie[] = [];

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

  constructor(
    private authService: AuthService, 
    private router: Router,
    private catalogoService: CatalogoService
  ) {
    this.checkLoginStatus();
  }

  ngOnInit() {
    this.catalogoService.listarPeliculas().subscribe({
      next: (data) => (this.peliculas = data),
      error: () => {}
    });

    this.catalogoService.listarSeries().subscribe({
      next: (data) => (this.series = data),
      error: () => {}
    });
  }

  checkLoginStatus() {
    const token = this.authService.obtenerToken();
    this.isLoggedIn = !!token;
    this.userName = localStorage.getItem('nombreUsuario') || '';
  }

  buscar() {
    if (!this.terminoBusqueda.trim()) {
      this.resultados = [];
      this.showSugerencias = false;
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase();
    
    const peliculasEncontradas = this.peliculas
      .filter(p => p.titulo.toLowerCase().includes(termino))
      .map(p => ({ id: p.id, titulo: p.titulo, tipo: 'pelicula' as const }));

    const seriesEncontradas = this.series
      .filter(s => s.titulo.toLowerCase().includes(termino))
      .map(s => ({ id: s.id, titulo: s.titulo, tipo: 'serie' as const }));

    this.resultados = [...peliculasEncontradas, ...seriesEncontradas].slice(0, 8);
    this.showSugerencias = true;
  }

  irADetalle(resultado: ResultadoBusqueda) {
    this.router.navigate(['/detalle', resultado.tipo, resultado.id]);
    this.cerrarBusqueda();
  }

  ocultarSugerencias() {
    setTimeout(() => {
      this.showSugerencias = false;
    }, 200);
  }

  cerrarBusqueda() {
    this.showSugerencias = false;
    this.terminoBusqueda = '';
    this.resultados = [];
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
