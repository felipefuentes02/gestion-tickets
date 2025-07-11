import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.page.html',
  styleUrls: ['./solicitudes-pendientes.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule, CommonModule]
})
export class SolicitudesPendientesPage implements OnInit {
  
  solicitudes: any[] = [];
  filteredSolicitudes: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.cargarSolicitudesPendientes();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  cargarSolicitudesPendientes() {
    // Datos simulados de solicitudes pendientes (vencidas)
    this.solicitudes = [
      {
        id: 8,
        numero: 'TK-2025-008',
        asunto: 'Problema crítico en servidor',
        solicitante: 'Miguel Herrera',
        departamento: 'IT',
        prioridad: 'Alta',
        fechaCreacion: '2025-07-01',
        fechaVencimiento: '2025-07-02',
        estado: 'Vencido',
        diasVencido: 4,
        tiempoVencido: '4 días'
      },
      {
        id: 9,
        numero: 'TK-2025-009',
        asunto: 'Solicitud de equipo nuevo',
        solicitante: 'Sandra Morales',
        departamento: 'Administración',
        prioridad: 'Media',
        fechaCreacion: '2025-06-30',
        fechaVencimiento: '2025-07-03',
        estado: 'Vencido',
        diasVencido: 3,
        tiempoVencido: '3 días'
      },
      {
        id: 10,
        numero: 'TK-2025-010',
        asunto: 'Error en sistema de facturación',
        solicitante: 'Diego Vargas',
        departamento: 'Contabilidad',
        prioridad: 'Alta',
        fechaCreacion: '2025-06-28',
        fechaVencimiento: '2025-06-30',
        estado: 'Vencido',
        diasVencido: 6,
        tiempoVencido: '6 días'
      },
      {
        id: 11,
        numero: 'TK-2025-011',
        asunto: 'Capacitación en nuevo software',
        solicitante: 'Elena Castro',
        departamento: 'RRHH',
        prioridad: 'Baja',
        fechaCreacion: '2025-06-25',
        fechaVencimiento: '2025-07-01',
        estado: 'Vencido',
        diasVencido: 5,
        tiempoVencido: '5 días'
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

  getVencimientoColor(diasVencido: number): string {
    if (diasVencido >= 5) return 'danger';
    if (diasVencido >= 3) return 'warning';
    return 'medium';
  }

  getVencimientoIcon(diasVencido: number): string {
    if (diasVencido >= 5) return 'alert-circle';
    if (diasVencido >= 3) return 'warning';
    return 'time';
  }

  marcarComoUrgente(solicitud: any, event: Event) {
    event.stopPropagation();
    // Aquí implementarías la lógica para marcar como urgente
    console.log('Marcando como urgente:', solicitud.numero);
  }
}