import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { PeliculasComponent } from './pages/peliculas/peliculas';
import { SeriesComponent } from './pages/series/series';
import { GenerosComponent } from './pages/generos/generos';
import { ContactosComponent } from './pages/contactos/contactos';
import { NosotrosComponent } from './pages/nosotros/nosotros';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'generos/:genero', component: GenerosComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];