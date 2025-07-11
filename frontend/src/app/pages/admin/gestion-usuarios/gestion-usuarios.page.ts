import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, FormsModule]
})
export class GestionUsuariosPage implements OnInit {

  // Control de vista
  vistaActual: 'lista' | 'crear' | 'editar' = 'lista';
  usuarioEditando: any = null;

  // Filtros y búsqueda
  filtroTexto: string = '';
  filtroDepartamento: string = '';
  filtroRol: string = '';

  // Formulario de usuario
  nuevoUsuario = {
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    password: '',
    confirmPassword: '',
    idRol: '',
    idDepartamento: '',
    esInterno: true
  };

  // Datos de referencia
  departamentos = [
    { id: 1, nombre: 'Administración' },
    { id: 2, nombre: 'Comercial' },
    { id: 3, nombre: 'Informática' },
    { id: 4, nombre: 'Operaciones' }
  ];

  roles = [
    { id: 1, nombre: 'Cliente' },
    { id: 2, nombre: 'Responsable de Respuesta' },
    { id: 3, nombre: 'Administrador' }
  ];

  // Lista de usuarios
  usuarios = [
    {
      id: 1,
      primerNombre: 'Juan',
      segundoNombre: 'Carlos',
      primerApellido: 'Pérez',
      segundoApellido: 'González',
      correo: 'juan.perez@empresa.com',
      rol: 'Administrador',
      departamento: 'Informática',
      esInterno: true,
      ultimoAcceso: '2025-07-06 09:30',
      activo: true
    },
    {
      id: 2,
      primerNombre: 'María',
      segundoNombre: '',
      primerApellido: 'González',
      segundoApellido: 'López',
      correo: 'maria.gonzalez@empresa.com',
      rol: 'Responsable de Respuesta',
      departamento: 'Administración',
      esInterno: true,
      ultimoAcceso: '2025-07-06 08:45',
      activo: true
    },
    {
      id: 3,
      primerNombre: 'Carlos',
      segundoNombre: 'Eduardo',
      primerApellido: 'Martínez',
      segundoApellido: 'Silva',
      correo: 'carlos.martinez@cliente.com',
      rol: 'Cliente',
      departamento: '',
      esInterno: false,
      ultimoAcceso: '2025-07-05 16:20',
      activo: true
    },
    {
      id: 4,
      primerNombre: 'Ana',
      segundoNombre: 'Patricia',
      primerApellido: 'Rodríguez',
      segundoApellido: 'Morales',
      correo: 'ana.rodriguez@empresa.com',
      rol: 'Responsable de Respuesta',
      departamento: 'Operaciones',
      esInterno: true,
      ultimoAcceso: '2025-07-06 10:15',
      activo: false
    },
    {
      id: 5,
      primerNombre: 'Luis',
      segundoNombre: '',
      primerApellido: 'Fernández',
      segundoApellido: 'Castro',
      correo: 'luis.fernandez@empresa.com',
      rol: 'Cliente',
      departamento: 'Comercial',
      esInterno: true,
      ultimoAcceso: '2025-07-04 14:30',
      activo: true
    }
  ];

  constructor(
    public userService: UserService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('Gestión de usuarios iniciada');
  }

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  // Filtrado de usuarios
  get usuariosFiltrados() {
    return this.usuarios.filter(usuario => {
      const coincideTexto = !this.filtroTexto || 
        usuario.primerNombre.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        usuario.primerApellido.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        usuario.correo.toLowerCase().includes(this.filtroTexto.toLowerCase());
      
      const coincideDepartamento = !this.filtroDepartamento || 
        usuario.departamento === this.filtroDepartamento;
      
      const coincideRol = !this.filtroRol || 
        usuario.rol === this.filtroRol;

      return coincideTexto && coincideDepartamento && coincideRol;
    });
  }

  // Cambiar vista
  cambiarVista(vista: 'lista' | 'crear' | 'editar') {
    this.vistaActual = vista;
    if (vista === 'crear') {
      this.limpiarFormulario();
    }
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.nuevoUsuario = {
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      correo: '',
      password: '',
      confirmPassword: '',
      idRol: '',
      idDepartamento: '',
      esInterno: true
    };
  }

  // Crear usuario
  async crearUsuario() {
    if (!this.validarFormulario()) {
      return;
    }

    // Simular creación
    const nuevoId = Math.max(...this.usuarios.map(u => u.id)) + 1;
    const rolNombre = this.roles.find(r => r.id.toString() === this.nuevoUsuario.idRol)?.nombre || '';
    const departamentoNombre = this.nuevoUsuario.idDepartamento ? 
      this.departamentos.find(d => d.id.toString() === this.nuevoUsuario.idDepartamento)?.nombre || '' : '';

    this.usuarios.push({
      id: nuevoId,
      primerNombre: this.nuevoUsuario.primerNombre,
      segundoNombre: this.nuevoUsuario.segundoNombre,
      primerApellido: this.nuevoUsuario.primerApellido,
      segundoApellido: this.nuevoUsuario.segundoApellido,
      correo: this.nuevoUsuario.correo,
      rol: rolNombre,
      departamento: departamentoNombre,
      esInterno: this.nuevoUsuario.esInterno,
      ultimoAcceso: 'Nunca',
      activo: true
    });

    await this.mostrarToast('Usuario creado exitosamente', 'success');
    this.cambiarVista('lista');
  }

  // Editar usuario
  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
    this.nuevoUsuario = {
      primerNombre: usuario.primerNombre,
      segundoNombre: usuario.segundoNombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido,
      correo: usuario.correo,
      password: '',
      confirmPassword: '',
      idRol: this.roles.find(r => r.nombre === usuario.rol)?.id.toString() || '',
      idDepartamento: usuario.departamento ? this.departamentos.find(d => d.nombre === usuario.departamento)?.id.toString() || '' : '',
      esInterno: usuario.esInterno
    };
    this.cambiarVista('editar');
  }

  // Actualizar usuario
  async actualizarUsuario() {
    if (!this.validarFormulario(true)) {
      return;
    }

    const index = this.usuarios.findIndex(u => u.id === this.usuarioEditando.id);
    if (index !== -1) {
      const rolNombre = this.roles.find(r => r.id.toString() === this.nuevoUsuario.idRol)?.nombre || '';
      const departamentoNombre = this.nuevoUsuario.idDepartamento ? 
        this.departamentos.find(d => d.id.toString() === this.nuevoUsuario.idDepartamento)?.nombre || '' : '';

      this.usuarios[index] = {
        ...this.usuarios[index],
        primerNombre: this.nuevoUsuario.primerNombre,
        segundoNombre: this.nuevoUsuario.segundoNombre,
        primerApellido: this.nuevoUsuario.primerApellido,
        segundoApellido: this.nuevoUsuario.segundoApellido,
        correo: this.nuevoUsuario.correo,
        rol: rolNombre,
        departamento: departamentoNombre,
        esInterno: this.nuevoUsuario.esInterno
      };
    }

    await this.mostrarToast('Usuario actualizado exitosamente', 'success');
    this.cambiarVista('lista');
  }

  // Eliminar usuario
  async eliminarUsuario(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario ${usuario.primerNombre} ${usuario.primerApellido}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            const index = this.usuarios.findIndex(u => u.id === usuario.id);
            if (index !== -1) {
              this.usuarios.splice(index, 1);
              this.mostrarToast('Usuario eliminado exitosamente', 'success');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Cambiar estado activo/inactivo
  async cambiarEstadoUsuario(usuario: any) {
    const nuevoEstado = !usuario.activo;
    const accion = nuevoEstado ? 'activar' : 'desactivar';
    
    const alert = await this.alertController.create({
      header: `Confirmar ${accion}`,
      message: `¿Deseas ${accion} al usuario ${usuario.primerNombre} ${usuario.primerApellido}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: accion.charAt(0).toUpperCase() + accion.slice(1),
          handler: () => {
            usuario.activo = nuevoEstado;
            this.mostrarToast(`Usuario ${nuevoEstado ? 'activado' : 'desactivado'} exitosamente`, 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  // Validar formulario
  validarFormulario(esEdicion: boolean = false): boolean {
    if (!this.nuevoUsuario.primerNombre || !this.nuevoUsuario.primerApellido || 
        !this.nuevoUsuario.correo || !this.nuevoUsuario.idRol) {
      this.mostrarToast('Por favor completa todos los campos obligatorios', 'danger');
      return false;
    }

    // Validar que usuarios internos tengan departamento
    if (this.nuevoUsuario.esInterno && !this.nuevoUsuario.idDepartamento) {
      this.mostrarToast('Los usuarios internos deben tener un departamento asignado', 'danger');
      return false;
    }

    if (!esEdicion && (!this.nuevoUsuario.password || !this.nuevoUsuario.confirmPassword)) {
      this.mostrarToast('La contraseña hash es obligatoria para nuevos usuarios', 'danger');
      return false;
    }

    if (this.nuevoUsuario.password && this.nuevoUsuario.password !== this.nuevoUsuario.confirmPassword) {
      this.mostrarToast('Las contraseñas hash no coinciden', 'danger');
      return false;
    }

    // Validar email único
    const emailExiste = this.usuarios.some(u => 
      u.correo === this.nuevoUsuario.correo && 
      (!esEdicion || u.id !== this.usuarioEditando?.id)
    );

    if (emailExiste) {
      this.mostrarToast('El correo electrónico ya está en uso', 'danger');
      return false;
    }

    return true;
  }

  // Mostrar toast
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  // Limpiar filtros
  limpiarFiltros() {
    this.filtroTexto = '';
    this.filtroDepartamento = '';
    this.filtroRol = '';
  }

  // Obtener nombre completo
  getNombreCompleto(usuario: any): string {
    return `${usuario.primerNombre} ${usuario.segundoNombre ? usuario.segundoNombre + ' ' : ''}${usuario.primerApellido} ${usuario.segundoApellido}`.trim();
  }

  // Función para manejar cambio de tipo de usuario
  onTipoUsuarioChange() {
    if (!this.nuevoUsuario.esInterno) {
      this.nuevoUsuario.idDepartamento = '';
    }
  }
}