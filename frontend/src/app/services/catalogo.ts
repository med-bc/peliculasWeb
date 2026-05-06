import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id: number;
  titulo: string;
  imagenUrl: string;
  descripcion: string;
  genero: string;
  anio: number;
}

export interface Serie {
  id: number;
  titulo: string;
  imagenUrl: string;
  descripcion: string;
  genero: string;
  anio: number;
  temporadas: number;
}

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private peliculasApi = 'http://localhost:8080/api/peliculas';
  private seriesApi = 'http://localhost:8080/api/series';

  constructor(private http: HttpClient) {}

  listarPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.peliculasApi);
  }

  listarSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.seriesApi);
  }
}
