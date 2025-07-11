import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido: string;
    correo: string;
    rol: {
      id: number;
      nombre: string;
    };
    departamento: {
      id: number;
      nombre: string;
    };
    esInterno: boolean;
  };
}

export interface RegisterRequest {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  contrasena: string;
  rolId: number;
  departamentoId: number;
  esInterno: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar token al inicializar
    this.checkStoredAuth();
  }

  private checkStoredAuth() {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
      this.validateToken().subscribe(
        () => {}, // Token válido
        () => this.logout() // Token inválido
      );
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          console.error('Error en login:', error);
          throw error;
        })
      );
  }

  register(userData: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          localStorage.setItem('auth_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  validateToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.rol?.nombre || null;
  }
}