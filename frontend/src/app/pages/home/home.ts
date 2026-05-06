import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogoService, Pelicula, Serie } from '../../services/catalogo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  peliculas: Pelicula[] = [];
  series: Serie[] = [];

  constructor(private catalogoService: CatalogoService) {}

  ngOnInit() {
    this.catalogoService.listarPeliculas().subscribe({
      next: (data) => (this.peliculas = data),
      error: () => (this.peliculas = [])
    });

    this.catalogoService.listarSeries().subscribe({
      next: (data) => (this.series = data),
      error: () => (this.series = [])
    });
  }
}