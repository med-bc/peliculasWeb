import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogoService, Pelicula } from '../../services/catalogo';
import { AuthService } from '../../services/auth';
import { CalificacionResumen, Resena, SocialService } from '../../services/social';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.css'
})
export class PeliculasComponent {
  peliculas: Pelicula[] = [];
  seleccionada: Pelicula | null = null;
  resenas: Resena[] = [];
  resumen: CalificacionResumen | null = null;
  miPuntuacion = 5;
  tituloResena = '';
  comentarioResena = '';
  esFavorito = false;

  constructor(
    private catalogoService: CatalogoService,
    private socialService: SocialService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.catalogoService.listarPeliculas().subscribe({
      next: (data) => (this.peliculas = data),
      error: () => alert('No se pudo cargar el catalogo de peliculas')
    });
  }

  abrirDetalle(pelicula: Pelicula) {
    this.seleccionada = pelicula;
    this.tituloResena = '';
    this.comentarioResena = '';
    this.cargarSocial(pelicula.id);
  }

  private cargarSocial(contenidoId: number) {
    const usuarioId = this.authService.obtenerUsuarioId() ?? undefined;

    this.socialService.listarResenas('PELICULA', contenidoId).subscribe({
      next: (data) => (this.resenas = data),
      error: () => (this.resenas = [])
    });

    this.socialService.obtenerResumen('PELICULA', contenidoId, usuarioId).subscribe({
      next: (data) => {
        this.resumen = data;
        this.miPuntuacion = data.miPuntuacion ?? 5;
      },
      error: () => (this.resumen = null)
    });

    if (usuarioId) {
      this.socialService.esFavorito(usuarioId, 'PELICULA', contenidoId).subscribe({
        next: (data) => (this.esFavorito = data.favorito),
        error: () => (this.esFavorito = false)
      });
    }
  }

  enviarCalificacion() {
    const usuarioId = this.authService.obtenerUsuarioId();
    if (!usuarioId || !this.seleccionada) {
      alert('Inicia sesion para calificar');
      return;
    }

    this.socialService
      .calificar({
        usuarioId,
        tipoContenido: 'PELICULA',
        contenidoId: this.seleccionada.id,
        puntuacion: this.miPuntuacion
      })
      .subscribe({
        next: (data) => (this.resumen = data),
        error: () => alert('No se pudo guardar la calificacion')
      });
  }

  enviarResena() {
    const usuarioId = this.authService.obtenerUsuarioId();
    if (!usuarioId || !this.seleccionada) {
      alert('Inicia sesion para publicar una resena');
      return;
    }

    if (!this.tituloResena.trim() || !this.comentarioResena.trim()) {
      alert('Completa el titulo y comentario');
      return;
    }

    this.socialService
      .crearResena({
        usuarioId,
        tipoContenido: 'PELICULA',
        contenidoId: this.seleccionada.id,
        titulo: this.tituloResena.trim(),
        comentario: this.comentarioResena.trim()
      })
      .subscribe({
        next: () => {
          this.tituloResena = '';
          this.comentarioResena = '';
          this.cargarSocial(this.seleccionada!.id);
        },
        error: () => alert('No se pudo publicar la resena')
      });
  }

  toggleFavorito() {
    const usuarioId = this.authService.obtenerUsuarioId();
    if (!usuarioId || !this.seleccionada) {
      alert('Inicia sesion para agregar favoritos');
      return;
    }

    this.socialService
      .toggleFavorito({
        usuarioId,
        tipoContenido: 'PELICULA',
        contenidoId: this.seleccionada.id
      })
      .subscribe({
        next: (res) => (this.esFavorito = res.favorito),
        error: () => alert('No se pudo actualizar favoritos')
      });
  }
}
