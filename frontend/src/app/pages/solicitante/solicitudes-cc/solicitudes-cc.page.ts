import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
//import { ApiService } from '../../../services/api.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-solicitudes-cc',
  templateUrl: './solicitudes-cc.page.html',
  styleUrls: ['./solicitudes-cc.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class SolicitudesCcPage implements OnInit {
  ticketsEnCC: any[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private router: Router,
    //private apiService: ApiService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.cargarTicketsEnCC();
  }

  cargarTicketsEnCC() {
    this.loading = true;
    // Simulamos tickets donde el usuario está en copia
    setTimeout(() => {
      this.ticketsEnCC = [
        {
          id: 101,
          numero_ticket: 'TK-2024-101',
          asunto: 'Problema con servidor de correo',
          solicitante: 'María González',
          departamento: 'Informática',
          estado: 'En Proceso',
          prioridad: 'Alta',
          fecha_creacion: '2024-07-01T10:30:00Z'
        },
        {
          id: 102,
          numero_ticket: 'TK-2024-102',
          asunto: 'Solicitud de nuevo equipo',
          solicitante: 'Carlos Pérez',
          departamento: 'Administración',
          estado: 'Pendiente',
          prioridad: 'Media',
          fecha_creacion: '2024-07-02T14:15:00Z'
        }
      ];
      this.loading = false;
    }, 1000);
  }

  verDetalle(ticketId: number) {
    this.router.navigate(['/ticket-detail', ticketId]);
  }

  filtrarTickets() {
    if (!this.searchTerm.trim()) {
      this.cargarTicketsEnCC();
      return;
    }
    
    this.ticketsEnCC = this.ticketsEnCC.filter(ticket =>
      ticket.asunto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.numero_ticket.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ticket.solicitante.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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