import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogoService, Pelicula } from '../../services/catalogo';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.css'
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit() {
    this.catalogoService.listarPeliculas().subscribe({
      next: (data) => (this.peliculas = data),
      error: () => alert('No se pudo cargar el catalogo de peliculas')
    });
  }
}
