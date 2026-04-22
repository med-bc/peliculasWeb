import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series.html',
  styleUrl: './series.css'
})
export class SeriesComponent {
  series = Array(20).fill(null).map((_, i) => ({ id: i + 1, titulo: `Serie ${i + 1}` }));
}
