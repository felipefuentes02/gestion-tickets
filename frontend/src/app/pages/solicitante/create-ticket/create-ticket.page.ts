import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TicketsService } from '../../../services/tickets.service';
import { AuthService } from '../../../services/auth.service';
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
    departamentoId: null as number | null,
    prioridadId: 2 // Prioridad media por defecto
  };

  // Datos de referencia
  departamentos: any[] = [];
  prioridades: any[] = [];
  
  // Estado del componente
  loading = false;
  attachedFiles: AttachedFile[] = [];
  readonly MAX_FILES = 4;
  readonly MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB
  readonly ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/gif',
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  constructor(
    private router: Router,
    private toastController: ToastController,
    public userService: UserService,
    private ticketsService: TicketsService,
    private authService: AuthService
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

  ngOnInit() {
    this.cargarDatosReferencia();
  }

  cargarDatosReferencia() {
    // Datos hardcodeados - puedes crear servicios para estos
    this.departamentos = [
      { id: 1, nombre: 'Informática' },
      { id: 2, nombre: 'Recursos Humanos' },
      { id: 3, nombre: 'Administración' },
      { id: 4, nombre: 'Operaciones' },
      { id: 5, nombre: 'Ventas' }
    ];

    this.prioridades = [
      { id: 1, nombre: 'Baja' },
      { id: 2, nombre: 'Media' },
      { id: 3, nombre: 'Alta' }
    ];
  }

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
    event.target.value = '';
  }

  private processFiles(files: FileList) {
    const filesToAdd: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        this.showToast(`El archivo "${file.name}" no es de un tipo permitido.`, 'warning');
        continue;
      }
      
      filesToAdd.push(file);
    }

    if (this.attachedFiles.length + filesToAdd.length > this.MAX_FILES) {
      this.showToast(`Solo puedes adjuntar máximo ${this.MAX_FILES} archivos.`, 'warning');
      return;
    }

    const currentTotalSize = this.attachedFiles.reduce((total, file) => total + file.size, 0);
    const newFilesSize = filesToAdd.reduce((total, file) => total + file.size, 0);
    
    if (currentTotalSize + newFilesSize > this.MAX_TOTAL_SIZE) {
      this.showToast(`El tamaño total de los archivos no puede exceder ${this.formatFileSize(this.MAX_TOTAL_SIZE)}.`, 'warning');
      return;
    }

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

  removeFile(fileId: string) {
    this.attachedFiles = this.attachedFiles.filter(file => file.id !== fileId);
    this.showToast('Archivo removido correctamente.', 'success');
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getTotalSize(): number {
    return this.attachedFiles.reduce((total, file) => total + file.size, 0);
  }

  getSizePercentage(): number {
    return (this.getTotalSize() / this.MAX_TOTAL_SIZE) * 100;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  isFormValid(): boolean {
    return this.ticket.asunto.trim().length > 0 && 
           this.ticket.descripcion.trim().length > 0 && 
           this.ticket.departamentoId !== null;
  }

  async crearTicket() {
    if (!this.isFormValid()) {
      this.showToast('Por favor completa todos los campos requeridos.', 'warning');
      return;
    }

    this.loading = true;

    try {
      const currentUser = this.authService.getCurrentUser();
      
      const ticketData = {
        asunto: this.ticket.asunto,
        descripcion: this.ticket.descripcion,
        solicitanteId: currentUser.id,
        departamentoId: this.ticket.departamentoId!,
        prioridadId: this.ticket.prioridadId
      };

      const response = await this.ticketsService.createTicket(ticketData).toPromise();
      
      // Subir archivos si existen
      if (this.attachedFiles.length > 0) {
        const formData = new FormData();
        this.attachedFiles.forEach(file => {
          formData.append('files', file.file);
        });
        
        await this.ticketsService.uploadFiles(response.id, formData).toPromise();
      }
      
      this.showToast('Ticket creado exitosamente', 'success');
      this.router.navigate(['/tickets']);
      
    } catch (error: any) {
      this.showToast(error.error?.message || 'Error al crear el ticket', 'danger');
    } finally {
      this.loading = false;
    }
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}