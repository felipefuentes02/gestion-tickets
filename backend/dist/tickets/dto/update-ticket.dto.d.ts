import { CreateTicketDto } from './create-ticket.dto';
declare const UpdateTicketDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTicketDto>>;
export declare class UpdateTicketDto extends UpdateTicketDto_base {
    asunto?: string;
    descripcion?: string;
    departamentoId?: number;
    prioridadId?: number;
    estadoId?: number;
    asignadoA?: number;
}
export {};
