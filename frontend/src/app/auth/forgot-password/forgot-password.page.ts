import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  arrowBack, 
  mail, 
  checkmarkCircle 
} from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup;
  isLoading = false;
  emailEnviado = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Registrar iconos
    addIcons({ 
      'arrow-back': arrowBack,
      mail,
      'checkmark-circle': checkmarkCircle
    });

    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      
      // Simular envío de email
      setTimeout(() => {
        this.isLoading = false;
        this.emailEnviado = true;
        
        // Simular token para desarrollo
        const token = 'fake-reset-token-123';
        console.log('Token de recuperación (desarrollo):', token);
        
        // Mostrar mensaje de éxito
        this.mostrarMensaje('Email enviado correctamente');
      }, 2000);
    } else {
      this.forgotForm.get('email')?.markAsTouched();
    }
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }

  private mostrarMensaje(mensaje: string) {
    // Implementación simple de mensaje
    alert(mensaje);
  }
}
