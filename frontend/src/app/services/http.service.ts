import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, timeout, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  observe?: 'body';
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = environment.apiUrl + environment.apiVersion;

  constructor(private http: HttpClient) {}

  /**
   * Método GET genérico
   */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options)
      .pipe(
        timeout(environment.timeout),
        retry(environment.retryAttempts),
        catchError(this.handleError)
      );
  }

  /**
   * Método POST genérico
   */
  post<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, options)
      .pipe(
        timeout(environment.timeout),
        retry(environment.retryAttempts),
        catchError(this.handleError)
      );
  }

  /**
   * Método PUT genérico
   */
  put<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, options)
      .pipe(
        timeout(environment.timeout),
        retry(environment.retryAttempts),
        catchError(this.handleError)
      );
  }

  /**
   * Método DELETE genérico
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options)
      .pipe(
        timeout(environment.timeout),
        retry(environment.retryAttempts),
        catchError(this.handleError)
      );
  }

  /**
   * Método PATCH genérico
   */
  patch<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data, options)
      .pipe(
        timeout(environment.timeout),
        retry(environment.retryAttempts),
        catchError(this.handleError)
      );
  }

  /**
   * Método para subir archivos
   */
  upload<T>(endpoint: string, formData: FormData, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData, options)
      .pipe(
        timeout(environment.timeout * 3), // Más tiempo para uploads
        catchError(this.handleError)
      );
  }

  /**
   * Método para construir parámetros de consulta
   */
  buildParams(params: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    
    return httpParams;
  }

  /**
   * Método para construir headers
   */
  buildHeaders(headers: { [key: string]: string }): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    
    Object.keys(headers).forEach(key => {
      httpHeaders = httpHeaders.set(key, headers[key]);
    });
    
    return httpHeaders;
  }

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      switch (error.status) {
        case 0:
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
          break;
        case 400:
          errorMessage = error.error?.message || 'Solicitud incorrecta';
          break;
        case 401:
          errorMessage = 'No autorizado. Verifica tus credenciales.';
          break;
        case 403:
          errorMessage = 'Acceso denegado.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor.';
          break;
        case 503:
          errorMessage = 'Servicio no disponible.';
          break;
        default:
          errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Error HTTP:', error);
    return throwError(() => new Error(errorMessage));
  }
}