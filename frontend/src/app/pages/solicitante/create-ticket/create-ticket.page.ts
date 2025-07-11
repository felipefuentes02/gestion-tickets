import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { addIcons } from 'ionicons';
import { 
  arrowBack, 
  personCircle, 
  chevronDown,
  attachOutline,
  closeCircle,
  documentOutline
} from 'ionicons/icons';

interface AttachedFile {
  file: File;
  name: string;
  size: number;
  type: string;
  id: string;
}

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.page.html',
  styleUrls: ['./create-ticket.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateTicketPage implements OnInit {
  
  ticket = {
    asunto: '',
    descripcion: '',
    departamento: '',
    prioridad: 'media'
  };

  departamentos = [
    { id: 1, nombre: 'Informática' },
    { id: 2, nombre: 'Recursos Humanos' },
    { id: 3, nombre: 'Administración' },
    { id: 4, nombre: 'Operaciones' },
    { id: 5, nombre: 'Ventas' }
  ];

  prioridades = [
    { valor: 'baja', nombre: 'Baja' },
    { valor: 'media', nombre: 'Media' },
    { valor: 'alta', nombre: 'Alta' }
  ];

  // Propiedades para archivos adjuntos
  attachedFiles: AttachedFile[] = [];
  readonly MAX_FILES = 4;
  readonly MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB en bytes
  readonly ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  loading = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    public userService: UserService
  ) {
    addIcons({ 
      'arrow-back': arrowBack,
      'person-circle': personCircle,
      'chevron-down': chevronDown,
      'attach-outline': attachOutline,
      'close-circle': closeCircle,
      'document-outline': documentOutline
    });
  }

  ngOnInit() {}

  mostrarMenuUsuario(event: any) {
    this.userService.mostrarMenuUsuario(event);
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    
    if (!files || files.length === 0) {
      return;
    }

    this.processFiles(files);
    
    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    event.target.value = '';
  }

  // Procesar archivos seleccionados
  private processFiles(files: FileList) {
    const filesToAdd: File[] = [];
    
    // Convertir FileList a Array y validar cada archivo
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validar tipo de archivo
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        this.showToast(`El archivo "${file.name}" no es de un tipo permitido.`, 'warning');
        continue;
      }
      
      filesToAdd.push(file);
    }

    // Validar número máximo de archivos
    if (this.attachedFiles.length + filesToAdd.length > this.MAX_FILES) {
      this.showToast(`Solo puedes adjuntar máximo ${this.MAX_FILES} archivos.`, 'warning');
      return;
    }

    // Validar tamaño total
    const currentTotalSize = this.attachedFiles.reduce((total, file) => total + file.size, 0);
    const newFilesSize = filesToAdd.reduce((total, file) => total + file.size, 0);
    
    if (currentTotalSize + newFilesSize > this.MAX_TOTAL_SIZE) {
      this.showToast(`El tamaño total de los archivos no puede exceder ${this.formatFileSize(this.MAX_TOTAL_SIZE)}.`, 'warning');
      return;
    }

    // Agregar archivos válidos
    filesToAdd.forEach(file => {
      const attachedFile: AttachedFile = {
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        id: this.generateId()
      };
      this.attachedFiles.push(attachedFile);
    });

    if (filesToAdd.length > 0) {
      this.showToast(`${filesToAdd.length} archivo(s) adjuntado(s) correctamente.`, 'success');
    }
  }

  // Remover archivo adjunto
  removeFile(fileId: string) {
    this.attachedFiles = this.attachedFiles.filter(file => file.id !== fileId);
    this.showToast('Archivo removido correctamente.', 'success');
  }

  // Formatear tamaño de archivo
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Obtener tamaño total de archivos adjuntos
  getTotalSize(): number {
    return this.attachedFiles.reduce((total, file) => total + file.size, 0);
  }

  // Obtener porcentaje de uso del límite de tamaño
  getSizePercentage(): number {
    return (this.getTotalSize() / this.MAX_TOTAL_SIZE) * 100;
  }

  // Generar ID único para archivos
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Mostrar toast con mensaje
  private async showToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  // Activar selector de archivos
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Validar formulario
  isFormValid(): boolean {
    return this.ticket.asunto.trim().length > 0 && 
           this.ticket.descripcion.trim().length > 0 && 
           this.ticket.departamento.trim().length > 0;
  }

  // Crear ticket
  async crearTicket() {
    if (!this.isFormValid()) {
      this.showToast('Por favor completa todos los campos requeridos.', 'warning');
      return;
    }

    this.loading = true;

    try {
      // Simular creación de ticket
      await this.simularCreacionTicket();
      
      this.showToast('Ticket creado exitosamente', 'success');
      this.router.navigate(['/tickets']);
      
    } catch (error) {
      this.showToast('Error al crear el ticket. Intenta nuevamente.', 'danger');
    } finally {
      this.loading = false;
    }
  }

  // Simular creación de ticket (reemplazar con llamada real a API)
  private async simularCreacionTicket(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Ticket creado:', {
          ...this.ticket,
          archivos: this.attachedFiles.map(f => ({
            nombre: f.name,
            tamaño: f.size,
            tipo: f.type
          }))
        });
        resolve();
      }, 2000);
    });
  }

  // Volver atrás
  goBack() {
    this.router.navigate(['/home']);
  }
}