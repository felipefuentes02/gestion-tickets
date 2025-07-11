import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
//import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class TicketsPage implements OnInit {
  tickets: any[] = [];
  ticketsFiltrados: any[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private router: Router,
    //private apiService: ApiService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.loading = true;
    // Simulamos datos de tickets del usuario logueado
    setTimeout(() => {
      this.tickets = [
        {
          id: 1,
          numero_ticket: 'TK-2024-001',
          asunto: 'Problema con impresora',
          departamento: 'Informática',
          estado: 'En Proceso',
          prioridad: 'Media',
          fecha_creacion: '2024-07-01T09:30:00Z'
        },
        {
          id: 2,
          numero_ticket: 'TK-2024-002',
          asunto: 'Solicitud de vacaciones',
          departamento: 'Administración',
          estado: 'Resuelto',
          prioridad: 'Baja',
          fecha_creacion: '2024-07-02T11:15:00Z'
        },
        {
          id: 3,
          numero_ticket: 'TK-2024-003',
          asunto: 'Error en sistema de ventas',
          departamento: 'Operaciones',
          estado: 'Nuevo',
          prioridad: 'Alta',
          fecha_creacion: '2024-07-03T14:20:00Z'
        },
        {
          id: 4,
          numero_ticket: 'TK-2024-004',
          asunto: 'Cambio de contraseña',
          departamento: 'Informática',
          estado: 'Cerrado',
          prioridad: 'Baja',
          fecha_creacion: '2024-07-04T16:45:00Z'
        }
      ];
      this.ticketsFiltrados = [...this.tickets];
      this.loading = false;
    }, 1000);
  }

  filtrarTickets() {
    if (!this.searchTerm.trim()) {
      this.ticketsFiltrados = [...this.tickets];
      return;
    }
    
    const termino = this.searchTerm.toLowerCase();
    this.ticketsFiltrados = this.tickets.filter(ticket =>
      ticket.numero_ticket.toLowerCase().includes(termino) ||
      ticket.asunto.toLowerCase().includes(termino) ||
      ticket.estado.toLowerCase().includes(termino)
    );
  }

  verDetalle(ticketId: number) {
    this.router.navigate(['/ticket-detail', ticketId]);
  }

  volverHome() {
    this.router.navigate(['/home']);
  }

  getColorEstado(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'nuevo': return 'primary';
      case 'en proceso': return 'warning';
      case 'pendiente': return 'danger';
      case 'resuelto': return 'success';
      case 'cerrado': return 'medium';
      default: return 'medium';
    }
  }

  getColorPrioridad(prioridad: string): string {
    switch (prioridad.toLowerCase()) {
      case 'alta': return 'danger';
      case 'media': return 'warning';
      case 'baja': return 'success';
      default: return 'medium';
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }
}