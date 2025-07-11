import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { addIcons } from 'ionicons';
import { arrowBack, personCircle, chevronDown } from 'ionicons/icons';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TicketDetailPage implements OnInit {
  
  ticket: any = null;
  loading = true;
  ticketId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) {
    // Registrar iconos
    addIcons({ 
      'arrow-back': arrowBack,
      'person-circle': personCircle,
      'chevron-down': chevronDown
    });
  }

  ngOnInit() {
    this.ticketId = this.route.snapshot.paramMap.get('id') || '';
    this.cargarTicket();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  cargarTicket() {
    this.loading = true;
    
    setTimeout(() => {
      if (this.ticketId) {
        this.ticket = {
          id: this.ticketId,
          numeroTicket: `TK-2025-${this.ticketId.padStart(3, '0')}`,
          asunto: 'Ticket de ejemplo',
          descripcion: 'Este es un ticket de ejemplo para mostrar la funcionalidad.',
          solicitante: {
            primerNombre: 'Juan',
            primerApellido: 'Pérez',
            correo: 'juan@empresa.com'
          },
          departamento: {
            nombre: 'Informática'
          },
          prioridad: {
            nombre: 'Media'
          },
          estado: {
            nombre: 'Abierto'
          },
          createdAt: '2025-07-06T10:00:00Z'
        };
      }
      this.loading = false;
    }, 500);
  }

  formatDate(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'nuevo':
        return 'primary';
      case 'en proceso':
        return 'warning';
      case 'resuelto':
        return 'success';
      case 'cerrado':
        return 'medium';
      default:
        return 'medium';
    }
  }
}