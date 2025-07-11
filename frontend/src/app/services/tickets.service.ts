import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateTicketData {
  asunto: string;
  descripcion: string;
  solicitanteId: number;
  departamentoId: number;
  prioridadId: number;
  asignadoA?: number;
}

export interface UpdateTicketData {
  asunto?: string;
  descripcion?: string;
  departamentoId?: number;
  prioridadId?: number;
  estadoId?: number;
  asignadoA?: number;
}

export interface TicketFilters {
  departamentoId?: number;
  prioridadId?: number;
  estadoId?: number;
  solicitanteId?: number;
  asignadoA?: number;
  asunto?: string;
  numeroTicket?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  page?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = `${environment.apiUrl}/api/tickets`;

  constructor(private http: HttpClient) {}

  // Crear ticket
  createTicket(ticketData: CreateTicketData): Observable<any> {
    return this.http.post(this.apiUrl, ticketData);
  }

  // Obtener todos los tickets
  getTickets(filters?: TicketFilters): Observable<any[]> {
    let params = new HttpParams();
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof TicketFilters];
        if (value !== undefined && value !== null && value !== '') {
          params = params.append(key, value.toString());
        }
      });
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // Obtener ticket por ID
  getTicketById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar ticket
  updateTicket(id: number, updateData: UpdateTicketData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updateData);
  }

  // Eliminar ticket
  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener tickets por usuario
  getTicketsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Obtener tickets por departamento
  getTicketsByDepartment(departmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/department/${departmentId}`);
  }

  // Comentarios
  addComment(ticketId: number, comment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ticketId}/comments`, comment);
  }

  // Archivos adjuntos
  uploadFiles(ticketId: number, files: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ticketId}/files`, files);
  }

  // Derivar ticket
  transferTicket(ticketId: number, transferData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ticketId}/transfer`, transferData);
  }
}