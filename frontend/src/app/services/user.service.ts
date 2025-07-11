import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  nombreUsuario = 'Juan Pérez';

  constructor() { }

  async mostrarMenuUsuario(event: any) {
    // Versión simplificada sin popover por ahora
    const confirmLogout = confirm('¿Deseas cerrar sesión?');
    if (confirmLogout) {
      this.cerrarSesion();
    }
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    alert('Sesión cerrada correctamente');
    // Recargar la página para ir al login
    window.location.reload();
  }
}
