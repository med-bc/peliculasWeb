import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CatalogoService, Pelicula, Serie } from '../../services/catalogo';

interface ContenidoItem {
  id: number;
  titulo: string;
  imagenUrl: string;
  tipo: 'pelicula' | 'serie';
}

@Component({
  selector: 'app-generos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './generos.html',
  styleUrl: './generos.css'
})
export class GenerosComponent implements OnInit {
  genero: string = '';
  contenidos: ContenidoItem[] = [];
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private catalogoService: CatalogoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.genero = params['genero'] || '';
      this.cargarContenido();
    });
  }

  private cargarContenido() {
    this.cargando = true;
    this.contenidos = [];

    this.catalogoService.listarPeliculas().subscribe({
      next: (data) => {
        const peliculas = data
          .filter(p => p.genero?.toLowerCase() === this.genero.toLowerCase())
          .map(p => ({ id: p.id, titulo: p.titulo, imagenUrl: p.imagenUrl, tipo: 'pelicula' as const }));
        this.contenidos = [...this.contenidos, ...peliculas];
      },
      error: () => {}
    });

    this.catalogoService.listarSeries().subscribe({
      next: (data) => {
        const series = data
          .filter(s => s.genero?.toLowerCase() === this.genero.toLowerCase())
          .map(s => ({ id: s.id, titulo: s.titulo, imagenUrl: s.imagenUrl, tipo: 'serie' as const }));
        this.contenidos = [...this.contenidos, ...series];
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  getDetalleLink(contenido: ContenidoItem): string[] {
    const slug = contenido.titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return ['/detalle', contenido.tipo, `${contenido.id}-${slug}`];
  }
}
