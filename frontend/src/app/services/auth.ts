import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

login(data: any) {
    return this.http.post<any>(`${this.API}/login`, data);
  }

  register(usuario: any) {
    return this.http.post<any>(`${this.API}`, usuario);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  guardarSesion(usuarioId: number, nombreUsuario: string, rol: string) {
    localStorage.setItem('usuarioId', String(usuarioId));
    localStorage.setItem('nombreUsuario', nombreUsuario);
    localStorage.setItem('rol', rol);
  }

  obtenerUsuarioId(): number | null {
    const value = localStorage.getItem('usuarioId');
    return value ? Number(value) : null;
  }

cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('rol');
  }

  esAdmin(): boolean {
    return localStorage.getItem('rol') === 'ADMIN';
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }
}
