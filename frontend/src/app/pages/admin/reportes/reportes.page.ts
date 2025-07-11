import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, FormsModule]
})
export class ReportesPage implements OnInit {

  // Filtros de reporte
  filtros = {
    fechaInicio: '',
    fechaFin: '',
    departamento: '',
    prioridad: '',
    estado: '',
    tipoReporte: 'general'
  };

  // Opciones para filtros
  departamentos = ['Administración', 'Comercial', 'Informática', 'Operaciones'];
  prioridades = ['Baja', 'Media', 'Alta'];
  estados = ['Nuevo', 'En Proceso', 'Pendiente', 'Resuelto', 'Cerrado'];
  tiposReporte = [
    { id: 'general', nombre: 'Reporte General' },
    { id: 'sla', nombre: 'Cumplimiento SLA' },
    { id: 'tecnicos', nombre: 'Desempeño de Técnicos' },
    { id: 'clientes', nombre: 'Satisfacción de Clientes' }
  ];

  // Datos del reporte generado
  reporteGenerado: any = null;

  // Propiedad para mostrar el nombre del tipo de reporte en el template
  nombreTipoReporte: string = '';

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.establecerFechasPorDefecto();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  establecerFechasPorDefecto() {
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    this.filtros.fechaInicio = primerDiaMes.toISOString().split('T')[0];
    this.filtros.fechaFin = hoy.toISOString().split('T')[0];
  }

  generarReporte() {
    // Validar fechas
    if (this.filtros.fechaInicio > this.filtros.fechaFin) {
      this.mostrarMensaje('La fecha de inicio no puede ser mayor que la fecha fin', 'danger');
      return;
    }

    console.log('Generando reporte con filtros:', this.filtros);

    // Simulación de generación de reporte con datos de ejemplo
    this.reporteGenerado = {
      tipo: this.filtros.tipoReporte,
      fechaGeneracion: new Date().toISOString(),
      rangoFechas: `${this.filtros.fechaInicio} a ${this.filtros.fechaFin}`,
      datos: this.generarDatosEjemplo()
    };

    // Actualizar el nombre del tipo de reporte para mostrar en el template
    this.nombreTipoReporte = this.tiposReporte.find(t => t.id === this.reporteGenerado.tipo)?.nombre || '';

    console.log('Reporte generado:', this.reporteGenerado);
    this.mostrarMensaje('Reporte generado correctamente', 'success');
  }

  generarDatosEjemplo() {
    switch (this.filtros.tipoReporte) {
      case 'general':
        return {
          totalTickets: 125,
          ticketsAbiertos: 28,
          ticketsCerrados: 92,
          ticketsVencidos: 5,
          tiempoPromedioResolucion: '2.3 días',
          departamentos: [
            { nombre: 'Informática', cantidad: 45, porcentaje: 36 },
            { nombre: 'Administración', cantidad: 32, porcentaje: 25.6 },
            { nombre: 'Comercial', cantidad: 28, porcentaje: 22.4 },
            { nombre: 'Operaciones', cantidad: 20, porcentaje: 16 }
          ]
        };
      case 'sla':
        return {
          cumplimientoGlobal: 89,
          cumplimientoPorDepartamento: [
            { departamento: 'Informática', cumplimiento: 92, tickets: 45 },
            { departamento: 'Administración', cumplimiento: 88, tickets: 32 },
            { departamento: 'Comercial', cumplimiento: 85, tickets: 28 },
            { departamento: 'Operaciones', cumplimiento: 87, tickets: 20 }
          ],
          ticketsFueraSLA: [
            { id: 'TK-2025-112', asunto: 'Error en servidor', departamento: 'Informática', tiempoExcedido: '2 días' },
            { id: 'TK-2025-098', asunto: 'Solicitud de compra', departamento: 'Administración', tiempoExcedido: '1 día' }
          ]
        };
      case 'tecnicos':
        return {
          topTecnicos: [
            { nombre: 'Juan Pérez', ticketsResueltos: 28, tiempoPromedio: '1.2 días', satisfaccion: 4.5 },
            { nombre: 'María González', ticketsResueltos: 25, tiempoPromedio: '1.5 días', satisfaccion: 4.3 },
            { nombre: 'Carlos López', ticketsResueltos: 18, tiempoPromedio: '2.1 días', satisfaccion: 4.0 }
          ],
          metricasGlobales: {
            promedioTicketsPorTecnico: 23.7,
            promedioTiempoResolucion: '1.6 días',
            promedioSatisfaccion: 4.2
          }
        };
      case 'clientes':
        return {
          satisfaccionGlobal: 4.3,
          satisfaccionPorDepartamento: [
            { departamento: 'Informática', satisfaccion: 4.5 },
            { departamento: 'Administración', satisfaccion: 4.1 },
            { departamento: 'Comercial', satisfaccion: 4.2 },
            { departamento: 'Operaciones', satisfaccion: 4.0 }
          ],
          comentariosDestacados: [
            { cliente: 'Ana Martínez', comentario: 'Excelente servicio, resolvieron mi problema rápidamente', calificacion: 5 },
            { cliente: 'Luis Fernández', comentario: 'Buen servicio pero demoraron en responder', calificacion: 3 }
          ]
        };
      default:
        return {};
    }
  }

  descargarReporte() {
    // Aquí puedes implementar la lógica para descargar el reporte, por ejemplo, generar un PDF o CSV
    console.log('Descargando reporte...');
    this.mostrarMensaje('Reporte descargado exitosamente', 'success');
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const toast = document.createElement('ion-toast');
    toast.message = mensaje;
    toast.duration = 3000;
    toast.color = color;
    toast.position = 'top';

    document.body.appendChild(toast);
    await toast.present();
  }

  limpiarFiltros() {
    this.filtros = {
      fechaInicio: '',
      fechaFin: '',
      departamento: '',
      prioridad: '',
      estado: '',
      tipoReporte: 'general'
    };
    this.establecerFechasPorDefecto();
    this.reporteGenerado = null;
  }
}