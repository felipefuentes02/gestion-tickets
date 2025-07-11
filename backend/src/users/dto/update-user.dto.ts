import { IsEmail, IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  primerNombre?: string;

  @IsString()
  @IsOptional()
  segundoNombre?: string;

  @IsString()
  @IsOptional()
  primerApellido?: string;

  @IsString()
  @IsOptional()
  segundoApellido?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsInt()
  @IsOptional()
  rolId?: number;

  @IsInt()
  @IsOptional()
  departamentoId?: number;

  @IsBoolean()
  @IsOptional()
  esInterno?: boolean;
}