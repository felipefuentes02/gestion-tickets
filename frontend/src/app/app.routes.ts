import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta por defecto - redirige al login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  
  // Autenticación
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
 
  
  // Gestión de tickets - SOLICITANTE (Cliente)
  {
    path: 'home',
    loadComponent: () => import('./pages/solicitante//home/home.page').then(m => m.HomePage)
  },

  {
    path: 'create-ticket',
    loadComponent: () => import('./pages/solicitante/create-ticket/create-ticket.page').then(m => m.CreateTicketPage)
  },
  {
    path: 'tickets',
    loadComponent: () => import('./pages/solicitante/tickets/tickets.page').then(m => m.TicketsPage)
  },
  {
    path: 'ticket-detail/:id',
    loadComponent: () => import('./pages/solicitante/ticket-detail/ticket-detail.page').then(m => m.TicketDetailPage)
  },
  {
    path: 'solicitudes-cc',
    loadComponent: () => import('./pages/solicitante/solicitudes-cc/solicitudes-cc.page').then(m => m.SolicitudesCcPage)
  },
  
  // Rutas del Responsable
  {
    path: 'responsable-dashboard',
    loadComponent: () => import('./pages/responsable/dashboard/dashboard.page').then(m => m.DashboardPage)
  },
  {
    path: 'solicitudes-abiertas',
    loadComponent: () => import('./pages/responsable/solicitudes-abiertas/solicitudes-abiertas.page').then(m => m.SolicitudesAbiertasPage)
  },
  {
    path: 'solicitudes-cerradas',
    loadComponent: () => import('./pages/responsable/solicitudes-cerradas/solicitudes-cerradas.page').then(m => m.SolicitudesCerradasPage)
  },
  {
    path: 'solicitudes-pendientes',
    loadComponent: () => import('./pages/responsable/solicitudes-pendientes/solicitudes-pendientes.page').then(m => m.SolicitudesPendientesPage)
  },
  {
    path: 'metricas',
    loadComponent: () => import('./pages/responsable/metricas/metricas.page').then(m => m.MetricasPage)
  },
  
  // Rutas del Administrador
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.page').then(m => m.AdminDashboardPage)
  },
  {
    path: 'gestion-usuarios',
    loadComponent: () => import('./pages/admin/gestion-usuarios/gestion-usuarios.page').then(m => m.GestionUsuariosPage)
  },
  {
    path: 'reportes',
    loadComponent: () => import('./pages/admin/reportes/reportes.page').then(m => m.ReportesPage)
  },
  {
    path: 'configuraciones',
    loadComponent: () => import('./pages/admin/configuraciones/configuraciones.page').then(m => m.ConfiguracionesPage)
  },
  
  // Ruta wildcard para páginas no encontradas
  {
    path: '**',
    redirectTo: '/login'
  }
];