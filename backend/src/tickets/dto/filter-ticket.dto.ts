import { IsOptional, IsInt, IsString, IsDateString } from 'class-validator';

export class FilterTicketDto {
  @IsOptional()
  @IsInt()
  departamentoId?: number;

  @IsOptional()
  @IsInt()
  prioridadId?: number;

  @IsOptional()
  @IsInt()
  estadoId?: number;

  @IsOptional()
  @IsInt()
  solicitanteId?: number;

  @IsOptional()
  @IsInt()
  asignadoA?: number;

  @IsOptional()
  @IsString()
  asunto?: string;

  @IsOptional()
  @IsString()
  numeroTicket?: string;

  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @IsOptional()
  @IsDateString()
  fechaHasta?: string;

  @IsOptional()
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @IsInt()
  limit?: number = 10;
}