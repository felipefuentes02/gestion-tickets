import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ← AGREGAR ESTA LÍNEA
import { CommonModule } from '@angular/common'; // ← AGREGAR ESTA LÍNEA
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-solicitudes-abiertas',
  templateUrl: './solicitudes-abiertas.page.html',
  styleUrls: ['./solicitudes-abiertas.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule, CommonModule] // ← AGREGAR FormsModule y CommonModule
})
export class SolicitudesAbiertasPage implements OnInit {
  
  solicitudes: any[] = [];
  filteredSolicitudes: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.cargarSolicitudesAbiertas();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  cargarSolicitudesAbiertas() {
    // Datos simulados de solicitudes abiertas
    this.solicitudes = [
      {
        id: 1,
        numero: 'TK-2025-001',
        asunto: 'Problema con acceso al sistema',
        solicitante: 'María González',
        departamento: 'IT',
        prioridad: 'Alta',
        fechaCreacion: '2025-07-05',
        estado: 'Abierto',
        tiempoRestante: '4 horas'
      },
      {
        id: 2,
        numero: 'TK-2025-002',
        asunto: 'Solicitud de nuevo usuario',
        solicitante: 'Carlos Pérez',
        departamento: 'IT',
        prioridad: 'Media',
        fechaCreacion: '2025-07-05',
        estado: 'En Proceso',
        tiempoRestante: '1 día'
      },
      {
        id: 3,
        numero: 'TK-2025-003',
        asunto: 'Error en facturación',
        solicitante: 'Ana Martínez',
        departamento: 'Contabilidad',
        prioridad: 'Alta',
        fechaCreacion: '2025-07-04',
        estado: 'Abierto',
        tiempoRestante: '2 horas'
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
      solicitud.estado.toLowerCase().includes(this.searchTerm.toLowerCase())
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

  getEstadoColor(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'abierto': return 'primary';
      case 'en proceso': return 'warning';
      case 'pendiente': return 'danger';
      default: return 'medium';
    }
  }
}