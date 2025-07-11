import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule]
})
export class DashboardPage implements OnInit {
  
  // Datos simulados para métricas
  metricas = {
    ticketsAbiertos: 15,
    ticketsCerrados: 42,
    ticketsPendientes: 8,
    tiempoPromedioRespuesta: '2.5 hrs',
    satisfaccionPromedio: 4.2
  };

  constructor(public userService: UserService) { }

  ngOnInit() {
    // Aquí cargarías las métricas reales desde el API
    this.cargarMetricas();
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  cargarMetricas() {
    // Simulación de carga de datos
    console.log('Cargando métricas del dashboard...');
  }
}