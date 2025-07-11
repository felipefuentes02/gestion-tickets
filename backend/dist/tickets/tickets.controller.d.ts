import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { FilterTicketDto } from './dto/filter-ticket.dto';
export declare class TicketsController {
    private readonly ticketsService;
    constructor(ticketsService: TicketsService);
    create(createTicketDto: CreateTicketDto): Promise<{
        departamento: {
            id: number;
            nombre: string;
        };
        prioridad: {
            id: number;
            nombre: string;
            nivel: number;
        };
        solicitante: {
            correo: string;
            primerNombre: string;
            primerApellido: string;
            id: number;
        };
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        departamentoId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        asunto: string;
        descripcion: string;
        solicitanteId: number;
        prioridadId: number;
        asignadoA: number | null;
        estadoId: number;
        numeroTicket: string;
        fechaVencimiento: Date | null;
        fechaResolucion: Date | null;
        fechaCierre: Date | null;
    }>;
    findAll(filterDto: FilterTicketDto): Promise<({
        departamento: {
            id: number;
            nombre: string;
        };
        prioridad: {
            id: number;
            nombre: string;
            nivel: number;
        };
        solicitante: {
            correo: string;
            primerNombre: string;
            primerApellido: string;
            id: number;
        };
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        departamentoId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        asunto: string;
        descripcion: string;
        solicitanteId: number;
        prioridadId: number;
        asignadoA: number | null;
        estadoId: number;
        numeroTicket: string;
        fechaVencimiento: Date | null;
        fechaResolucion: Date | null;
        fechaCierre: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        departamento: {
            id: number;
            nombre: string;
        };
        prioridad: {
            id: number;
            nombre: string;
            nivel: number;
        };
        comentarios: ({
            usuario: {
                primerNombre: string;
                primerApellido: string;
                id: number;
            };
        } & {
            esInterno: boolean;
            id: number;
            createdAt: Date;
            updatedAt: Date | null;
            ticketId: number;
            usuarioId: number;
            comentario: string;
            esSolucion: boolean;
        })[];
        solicitante: {
            correo: string;
            primerNombre: string;
            primerApellido: string;
            id: number;
        };
        asignado: {
            correo: string;
            primerNombre: string;
            primerApellido: string;
            id: number;
        } | null;
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        departamentoId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        asunto: string;
        descripcion: string;
        solicitanteId: number;
        prioridadId: number;
        asignadoA: number | null;
        estadoId: number;
        numeroTicket: string;
        fechaVencimiento: Date | null;
        fechaResolucion: Date | null;
        fechaCierre: Date | null;
    }>;
    update(id: number, updateTicketDto: UpdateTicketDto): Promise<{
        departamento: {
            id: number;
            nombre: string;
        };
        prioridad: {
            id: number;
            nombre: string;
            nivel: number;
        };
        solicitante: {
            correo: string;
            primerNombre: string;
            primerApellido: string;
            id: number;
        };
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        departamentoId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        asunto: string;
        descripcion: string;
        solicitanteId: number;
        prioridadId: number;
        asignadoA: number | null;
        estadoId: number;
        numeroTicket: string;
        fechaVencimiento: Date | null;
        fechaResolucion: Date | null;
        fechaCierre: Date | null;
    }>;
    remove(id: number): Promise<{
        departamentoId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        asunto: string;
        descripcion: string;
        solicitanteId: number;
        prioridadId: number;
        asignadoA: number | null;
        estadoId: number;
        numeroTicket: string;
        fechaVencimiento: Date | null;
        fechaResolucion: Date | null;
        fechaCierre: Date | null;
    }>;
    findByUser(userId: number): Promise<({
        departamento: {
            id: number;
            nombre: string;
        };
        prioridad: {
            id: number;
            nombre: string;
            nivel: number;
        };
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        departamentoId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        asunto: string;
        descripcion: string;
        solicitanteId: number;
        prioridadId: number;
        asignadoA: number | null;
        estadoId: number;
        numeroTicket: string;
        fechaVencimiento: Date | null;
        fechaResolucion: Date | null;
        fechaCierre: Date | null;
    })[]>;
    findByDepartment(departmentId: number): Promise<({
        prioridad: {
            id: number;
            nombre: string;
            nivel: number;
        };
        solicitante: {
            correo: string;
            primerNombre: string;
            primerApellido: string;
            id: number;
        };
        estado: {
            id: number;
            nombre: string;
        };
    } & {
        departamentoId: number;
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        asunto: string;
        descripcion: string;
        solicitanteId: number;
        prioridadId: number;
        asignadoA: number | null;
        estadoId: number;
        numeroTicket: string;
        fechaVencimiento: Date | null;
        fechaResolucion: Date | null;
        fechaCierre: Date | null;
    })[]>;
}
