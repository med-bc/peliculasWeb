import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.html',
  styleUrl: './peliculas.css'
})
export class PeliculasComponent {
  peliculas = Array(20).fill(null).map((_, i) => ({ id: i + 1, titulo: `Película ${i + 1}` }));
}
