import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  personCircle, 
  chevronDown, 
  save, 
  create,
  trash,
  settings
} from 'ionicons/icons';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ConfiguracionesPage implements OnInit {

  slaForm: FormGroup;
  adjuntosForm: FormGroup;
  
  slaData = [
    { id: 1, departamento: 'Informática', tiempoRespuesta: 4, tiempoResolucion: 24, activo: true },
    { id: 2, departamento: 'Administración', tiempoRespuesta: 8, tiempoResolucion: 48, activo: true },
    { id: 3, departamento: 'Comercial', tiempoRespuesta: 6, tiempoResolucion: 36, activo: true },
    { id: 4, departamento: 'Operaciones', tiempoRespuesta: 2, tiempoResolucion: 12, activo: true }
  ];

  constructor(private formBuilder: FormBuilder) {
    addIcons({ 
      'person-circle': personCircle,
      'chevron-down': chevronDown,
      save,
      create,
      trash,
      settings
    });

    this.slaForm = this.formBuilder.group({
      departamento: ['', Validators.required],
      tiempoRespuesta: ['', [Validators.required, Validators.min(1)]],
      tiempoResolucion: ['', [Validators.required, Validators.min(1)]],
      activo: [true]
    });

    this.adjuntosForm = this.formBuilder.group({
      maxArchivos: [5, [Validators.required, Validators.min(1), Validators.max(20)]],
      maxTamanoMB: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
      tiposPermitidos: ['pdf, doc, docx, jpg, png, txt', Validators.required]
    });
  }

  ngOnInit() {
    console.log('Configuraciones cargadas');
  }

  mostrarMenuUsuario(event: any) {
    const confirmLogout = confirm('¿Deseas cerrar sesión?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }

  editarSLA(sla: any) {
    this.slaForm.patchValue({
      departamento: sla.departamento,
      tiempoRespuesta: sla.tiempoRespuesta,
      tiempoResolucion: sla.tiempoResolucion,
      activo: sla.activo
    });
  }

  guardarSLA() {
    if (this.slaForm.valid) {
      const formData = this.slaForm.value;
      console.log('Guardando SLA:', formData);
      alert('SLA actualizado correctamente');
      this.slaForm.reset();
    }
  }

  eliminarSLA(id: number) {
    if (confirm('¿Estás seguro de eliminar este SLA?')) {
      this.slaData = this.slaData.filter(sla => sla.id !== id);
      alert('SLA eliminado correctamente');
    }
  }

  guardarAdjuntos() {
    if (this.adjuntosForm.valid) {
      const formData = this.adjuntosForm.value;
      console.log('Guardando configuración de adjuntos:', formData);
      alert('Configuración de adjuntos actualizada');
    }
  }
}
