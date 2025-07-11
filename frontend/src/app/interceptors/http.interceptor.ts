import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';

let activeRequests = 0;
let loading: HTMLIonLoadingElement | null = null;

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingController = inject(LoadingController);
  const toastController = inject(ToastController);
  
  // Incrementar contador de peticiones activas
  activeRequests++;
  
  // Mostrar loading si es la primera petición
  if (activeRequests === 1) {
    showLoading(loadingController);
  }

  // Clonar la petición para añadir headers
  let authRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Añadir token de autenticación si existe
  const token = localStorage.getItem('auth_token');
  if (token) {
    authRequest = authRequest.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // Añadir timestamp para evitar cache
  if (req.method === 'GET') {
    authRequest = authRequest.clone({
      setParams: {
        '_t': Date.now().toString()
      }
    });
  }

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejo específico de errores
      handleHttpError(error, toastController);
      return throwError(() => error);
    }),
    finalize(() => {
      // Decrementar contador de peticiones activas
      activeRequests--;
      
      // Ocultar loading si no hay más peticiones activas
      if (activeRequests === 0) {
        hideLoading();
      }
    })
  );
};

async function showLoading(loadingController: LoadingController): Promise<void> {
  if (!loading) {
    loading = await loadingController.create({
      message: 'Cargando...',
      duration: 10000, // Máximo 10 segundos
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    await loading.present();
  }
}

async function hideLoading(): Promise<void> {
  if (loading) {
    await loading.dismiss();
    loading = null;
  }
}

async function handleHttpError(error: HttpErrorResponse, toastController: ToastController): Promise<void> {
  let message = '';
  
  switch (error.status) {
    case 0:
      message = 'Sin conexión al servidor';
      break;
    case 401:
      message = 'Sesión expirada';
      // Aquí podrías redirigir al login
      localStorage.removeItem('auth_token');
      break;
    case 403:
      message = 'Acceso denegado';
      break;
    case 404:
      message = 'Recurso no encontrado';
      break;
    case 500:
      message = 'Error interno del servidor';
      break;
    default:
      message = error.error?.message || `Error ${error.status}`;
  }

  // Mostrar toast con el error
  const toast = await toastController.create({
    message: message,
    duration: 3000,
    position: 'top',
    color: 'danger',
    buttons: [
      {
        text: 'Cerrar',
        role: 'cancel'
      }
    ]
  });
  
  await toast.present();
}