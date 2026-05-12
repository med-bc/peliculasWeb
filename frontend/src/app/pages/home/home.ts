import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CatalogoService, Pelicula, Serie } from '../../services/catalogo';

declare var YT: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  peliculas: Pelicula[] = [];
  series: Serie[] = [];
  videoPlaying = false;
  thumbnailError = false;
  private player: any;
  private playerReady = false;

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

    this.loadYouTubeAPI();
  }

  ngOnDestroy() {
    if (this.player && this.player.destroy) {
      this.player.destroy();
    }
  }

  private loadYouTubeAPI() {
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      this.waitForYouTubeAPI();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
      script.onload = () => this.waitForYouTubeAPI();
    }
  }

  private waitForYouTubeAPI() {
    const check = setInterval(() => {
      if (typeof YT !== 'undefined' && YT.Player) {
        clearInterval(check);
        this.initPlayer();
      }
    }, 100);
  }

  private initPlayer() {
    this.player = new YT.Player('youtube-player', {
      videoId: 'rQvIR1oL1vE',
      playerVars: {
        autoplay: 0,
        controls: 1,
        showinfo: 0,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: (event: any) => {
          this.playerReady = true;
        }
      }
    });
  }

  playVideo(): void {
    this.videoPlaying = true;
    setTimeout(() => {
      if (this.player && this.player.playVideo) {
        this.player.playVideo();
      }
    }, 100);
  }
}