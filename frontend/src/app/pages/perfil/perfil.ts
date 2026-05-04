import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { SocialService, Resena } from '../../services/social';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent {
  usuarioId: number | null = null;
  nombreUsuario = '';
  resenas: Resena[] = [];
  favoritos: Array<{ id: number; tipoContenido: 'PELICULA' | 'SERIE'; contenidoId: number }> = [];

  constructor(private authService: AuthService, private socialService: SocialService) {}

  ngOnInit() {
    this.usuarioId = this.authService.obtenerUsuarioId();
    this.nombreUsuario = localStorage.getItem('nombreUsuario') ?? '';

    if (!this.usuarioId) {
      return;
    }

    this.socialService.listarResenasUsuario(this.usuarioId).subscribe({
      next: (data) => (this.resenas = data),
      error: () => (this.resenas = [])
    });

    this.socialService.listarFavoritos(this.usuarioId).subscribe({
      next: (data) => (this.favoritos = data),
      error: () => (this.favoritos = [])
    });
  }
}
