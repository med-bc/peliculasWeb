import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generos.html',
  styleUrl: './generos.css'
})
export class GenerosComponent implements OnInit {
  genero: string = '';
  contenidos = Array(20).fill(null).map((_, i) => ({ id: i + 1, titulo: `Contenido ${i + 1}` }));

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.genero = params['genero'] || '';
    });
  }
}
