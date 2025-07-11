import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  asunto?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  @IsOptional()
  departamentoId?: number;

  @IsInt()
  @IsOptional()
  prioridadId?: number;

  @IsInt()
  @IsOptional()
  estadoId?: number;

  @IsInt()
  @IsOptional()
  asignadoA?: number;
}