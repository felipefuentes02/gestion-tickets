import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
export declare class TicketsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findAll(): Promise<({
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
    private generateTicketNumber;
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
