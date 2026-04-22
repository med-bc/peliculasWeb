import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  estrenos = [
    { id: 1, titulo: 'Demon Slayer' },
    { id: 2, titulo: 'Los 4 Fantásticos' },
    { id: 3, titulo: 'Better Man' },
    { id: 4, titulo: 'Flow' },
    { id: 5, titulo: 'Minecraft' },
    { id: 6, titulo: 'Conclave' },
    { id: 7, titulo: 'Destino Final' },
    { id: 8, titulo: 'Capitán América' },
    { id: 9, titulo: 'Estado Eléctrico' },
    { id: 10, titulo: 'Mickey: 17' }
  ];

  recomendadas = [
    { id: 1, titulo: 'Breaking Bad' },
    { id: 2, titulo: 'Parásitos' },
    { id: 3, titulo: 'The Walking Dead' },
    { id: 4, titulo: 'El Hoyo' },
    { id: 5, titulo: 'Better Call Saul' },
    { id: 6, titulo: 'Shrek 1' },
    { id: 7, titulo: 'Mr. Robot' },
    { id: 8, titulo: 'REC 1' },
    { id: 9, titulo: 'Juego de Tronos' },
    { id: 10, titulo: 'El Viaje de Chihiro' }
  ];
}