import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule]
})
export class AdminDashboardPage implements OnInit {

  // Métricas generales de toda la empresa
  metricas = {
    totalTickets: 156,
    ticketsAbiertos: 42,
    ticketsCerrados: 98,
    ticketsVencidos: 16,
    totalUsuarios: 85,
    totalDepartamentos: 6,
    satisfaccionPromedio: 4.1,
    porcentajeCumplimientoSLA: 84
  };

  // Métricas por departamento
  departamentos = [
    { nombre: 'IT', tickets: 45, abiertos: 12, cerrados: 28, vencidos: 5, sla: 88 },
    { nombre: 'Contabilidad', tickets: 32, abiertos: 8, cerrados: 22, vencidos: 2, sla: 92 },
    { nombre: 'RRHH', tickets: 28, abiertos: 6, cerrados: 20, vencidos: 2, sla: 89 },
    { nombre: 'Administración', tickets: 25, abiertos: 7, cerrados: 15, vencidos: 3, sla: 78 },
    { nombre: 'Ventas', tickets: 18, abiertos: 5, cerrados: 10, vencidos: 3, sla: 75 },
    { nombre: 'Marketing', tickets: 8, abiertos: 4, cerrados: 3, vencidos: 1, sla: 82 }
  ];

  // Actividad reciente
  actividadReciente = [
    { tipo: 'ticket_creado', usuario: 'Juan Pérez', accion: 'creó ticket TK-2025-156', tiempo: '5 min', icono: 'add-circle', color: 'primary' },
    { tipo: 'ticket_cerrado', usuario: 'María González', accion: 'cerró ticket TK-2025-145', tiempo: '12 min', icono: 'checkmark-circle', color: 'success' },
    { tipo: 'usuario_creado', usuario: 'Admin', accion: 'creó usuario Carlos López', tiempo: '25 min', icono: 'person-add', color: 'secondary' },
    { tipo: 'ticket_vencido', usuario: 'Sistema', accion: 'ticket TK-2025-134 venció SLA', tiempo: '1 hora', icono: 'warning', color: 'danger' },
    { tipo: 'derivacion', usuario: 'Ana Martín', accion: 'derivó ticket a IT', tiempo: '2 horas', icono: 'swap-horizontal', color: 'warning' }
  ];

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.cargarDashboard();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  cargarDashboard() {
    console.log('Cargando dashboard administrativo...');
  }

  getSLAColor(sla: number): string {
    if (sla >= 90) return 'success';
    if (sla >= 80) return 'warning';
    return 'danger';
  }

  getDepartamentoEstado(dept: any): string {
    if (dept.vencidos > 3) return 'danger';
    if (dept.abiertos > 10) return 'warning';
    return 'success';
  }
}