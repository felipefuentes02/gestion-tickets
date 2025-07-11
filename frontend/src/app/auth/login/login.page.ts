import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { 
  eye, 
  eyeOff, 
  alertCircle, 
  helpCircle 
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    addIcons({ 
      eye, 
      'eye-off': eyeOff, 
      'alert-circle': alertCircle,
      'help-circle': helpCircle
    });

    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Redirigir si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.redirectByRole();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showToast('Inicio de sesión exitoso', 'success');
          this.redirectByRole(response.user.rol.nombre);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error de autenticación';
          this.showToast(this.errorMessage, 'danger');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  irARecuperarContrasena() {
    this.router.navigate(['/forgot-password']);
  }

  private redirectByRole(role?: string) {
    const userRole = role || this.authService.getUserRole();
    
    switch (userRole?.toLowerCase()) {
      case 'administrador':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'responsable de respuesta':
        this.router.navigate(['/responsable-dashboard']);
        break;
      case 'cliente':
      default:
        this.router.navigate(['/home']);
        break;
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }
}