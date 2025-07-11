import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-solicitudes-cerradas',
  templateUrl: './solicitudes-cerradas.page.html',
  styleUrls: ['./solicitudes-cerradas.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule, CommonModule]
})
export class SolicitudesCerradasPage implements OnInit {
  
  solicitudes: any[] = [];
  filteredSolicitudes: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.cargarSolicitudesCerradas();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  cargarSolicitudesCerradas() {
    // Datos simulados de solicitudes cerradas
    this.solicitudes = [
      {
        id: 4,
        numero: 'TK-2025-004',
        asunto: 'Configuración de impresora',
        solicitante: 'Pedro López',
        departamento: 'IT',
        prioridad: 'Media',
        fechaCreacion: '2025-07-01',
        fechaCierre: '2025-07-02',
        estado: 'Cerrado',
        tiempoResolucion: '1 día',
        satisfaccion: 5
      },
      {
        id: 5,
        numero: 'TK-2025-005',
        asunto: 'Solicitud de vacaciones',
        solicitante: 'Laura Rodríguez',
        departamento: 'RRHH',
        prioridad: 'Baja',
        fechaCreacion: '2025-06-28',
        fechaCierre: '2025-06-29',
        estado: 'Cerrado',
        tiempoResolucion: '4 horas',
        satisfaccion: 4
      },
      {
        id: 6,
        numero: 'TK-2025-006',
        asunto: 'Error en nómina',
        solicitante: 'Roberto Silva',
        departamento: 'Contabilidad',
        prioridad: 'Alta',
        fechaCreacion: '2025-06-25',
        fechaCierre: '2025-06-26',
        estado: 'Cerrado',
        tiempoResolucion: '6 horas',
        satisfaccion: 3
      },
      {
        id: 7,
        numero: 'TK-2025-007',
        asunto: 'Actualización de software',
        solicitante: 'Carmen Torres',
        departamento: 'IT',
        prioridad: 'Media',
        fechaCreacion: '2025-06-20',
        fechaCierre: '2025-06-22',
        estado: 'Cerrado',
        tiempoResolucion: '2 días',
        satisfaccion: 5
      }
    ];
    
    this.filteredSolicitudes = [...this.solicitudes];
  }

  filtrarSolicitudes() {
    if (!this.searchTerm.trim()) {
      this.filteredSolicitudes = [...this.solicitudes];
      return;
    }

    this.filteredSolicitudes = this.solicitudes.filter(solicitud =>
      solicitud.numero.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solicitud.asunto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solicitud.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      solicitud.departamento.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  verDetalle(solicitud: any) {
    this.router.navigate(['/ticket-detail', solicitud.id]);
  }

  getPrioridadColor(prioridad: string): string {
    switch (prioridad.toLowerCase()) {
      case 'alta': return 'danger';
      case 'media': return 'warning';
      case 'baja': return 'success';
      default: return 'medium';
    }
  }

  getSatisfaccionColor(satisfaccion: number): string {
    if (satisfaccion >= 4) return 'success';
    if (satisfaccion >= 3) return 'warning';
    return 'danger';
  }

  getSatisfaccionIcon(satisfaccion: number): string {
    if (satisfaccion >= 4) return 'happy';
    if (satisfaccion >= 3) return 'sad';
    return 'sad';
  }
}
