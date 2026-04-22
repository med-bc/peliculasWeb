import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css'
})
export class ContactosComponent {
  formData = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  enviarMensaje() {
    console.log('Mensaje enviado:', this.formData);
    alert('¡Mensaje enviado! Nos contactaremos pronto.');
    this.formData = { nombre: '', email: '', asunto: '', mensaje: '' };
  }
}
