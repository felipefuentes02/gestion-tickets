import { IsString, IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  asunto: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsInt()
  @IsNotEmpty()
  solicitanteId: number;

  @IsInt()
  @IsNotEmpty()
  departamentoId: number;

  @IsInt()
  @IsNotEmpty()
  prioridadId: number;

  @IsInt()
  @IsOptional()
  asignadoA?: number;
}