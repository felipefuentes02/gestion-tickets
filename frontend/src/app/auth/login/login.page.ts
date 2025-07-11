import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    // Registrar iconos
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
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const credentials = this.loginForm.value;
        await this.simulateLogin(credentials);
        this.isLoading = false;
        
        const userRole = this.getUserRole(credentials.correo);
        this.redirectByRole(userRole);

      } catch (error: any) {
        this.isLoading = false;
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  // NUEVA FUNCIÓN: Ir a recuperar contraseña
  irARecuperarContrasena() {
    this.router.navigate(['/forgot-password']);
  }

  private async simulateLogin(credentials: any): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validCredentials = [
          { email: 'admin@empresa.com', password: '123456', role: 'administrador' },
          { email: 'responsable@empresa.com', password: '123456', role: 'responsable' },
          { email: 'cliente@empresa.com', password: '123456', role: 'cliente' }
        ];

        const user = validCredentials.find(
          cred => cred.email === credentials.correo && cred.password === credentials.contrasena
        );

        if (user) {
          localStorage.setItem('token', 'fake-jwt-token');
          localStorage.setItem('user', JSON.stringify({
            correo: user.email,
            rol: user.role
          }));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  private getUserRole(email: string): string {
    if (email.includes('admin')) return 'administrador';
    if (email.includes('responsable')) return 'responsable';
    return 'cliente';
  }

  private redirectByRole(role: string) {
    switch (role.toLowerCase()) {
      case 'administrador':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'responsable':
        this.router.navigate(['/responsable-dashboard']);
        break;
      case 'cliente':
      default:
        this.router.navigate(['/home']);
        break;
    }
  }
}