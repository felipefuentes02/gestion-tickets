import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.page.html',
  styleUrls: ['./metricas.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule]
})
export class MetricasPage implements OnInit {
  
  departamentoUsuario = 'IT';
  
  // Métricas principales simplificadas
  metricas = {
    totalTickets: 28,
    ticketsAbiertos: 8,
    ticketsCerrados: 18,
    ticketsEnProceso: 2,
    satisfaccionPromedio: 4.3,
    porcentajeCumplimientoSLA: 92
  };

  // Datos para gráfico circular de estados
  estadosChart = [
    { estado: 'Cerrados', cantidad: 18, porcentaje: 64, color: '#28a745' },
    { estado: 'Abiertos', cantidad: 8, porcentaje: 29, color: '#007bff' },
    { estado: 'En Proceso', cantidad: 2, porcentaje: 7, color: '#ffc107' }
  ];

  // Top 3 técnicos
  topTecnicos = [
    { nombre: 'Juan Pérez', tickets: 12, satisfaccion: 4.5, posicion: 1 },
    { nombre: 'María González', tickets: 10, satisfaccion: 4.2, posicion: 2 },
    { nombre: 'Carlos López', tickets: 6, satisfaccion: 4.1, posicion: 3 }
  ];

  // Tendencia semanal (Lun-Vie trabajo, Sáb-Dom solo recepción)
  tendenciaSemanal = [
    { dia: 'Lun', creados: 3, procesados: 4, esLaboral: true },
    { dia: 'Mar', creados: 5, procesados: 6, esLaboral: true },
    { dia: 'Mié', creados: 2, procesados: 3, esLaboral: true },
    { dia: 'Jue', creados: 6, procesados: 5, esLaboral: true },
    { dia: 'Vie', creados: 4, procesados: 7, esLaboral: true },
    { dia: 'Sáb', creados: 2, procesados: 0, esLaboral: false },
    { dia: 'Dom', creados: 1, procesados: 0, esLaboral: false }
  ];

  // Tipos de solicitudes más simples
  tiposSolicitudes = [
    { tipo: 'Acceso al sistema', cantidad: 8, icono: 'key', color: 'primary' },
    { tipo: 'Hardware', cantidad: 6, icono: 'desktop', color: 'secondary' },
    { tipo: 'Software', cantidad: 5, icono: 'download', color: 'tertiary' },
    { tipo: 'Red', cantidad: 4, icono: 'wifi', color: 'success' },
    { tipo: 'Otros', cantidad: 5, icono: 'help-circle', color: 'medium' }
  ];

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.cargarMetricasDepartamento();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  cargarMetricasDepartamento() {
    console.log(`Cargando métricas del departamento: ${this.departamentoUsuario}`);
  }

  getSatisfaccionColor(satisfaccion: number): string {
    if (satisfaccion >= 4.0) return 'success';
    if (satisfaccion >= 3.0) return 'warning';
    return 'danger';
  }

  getSLAColor(porcentaje: number): string {
    if (porcentaje >= 90) return 'success';
    if (porcentaje >= 75) return 'warning';
    return 'danger';
  }

  getPosicionIcon(posicion: number): string {
    switch(posicion) {
      case 1: return 'trophy';
      case 2: return 'medal';
      case 3: return 'ribbon';
      default: return 'person';
    }
  }

  getPosicionColor(posicion: number): string {
    switch(posicion) {
      case 1: return 'warning';
      case 2: return 'medium';
      case 3: return 'tertiary';
      default: return 'dark';
    }
  }
}