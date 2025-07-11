import { IsEmail, IsNotEmpty, IsString, MinLength, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  primerNombre: string;

  @IsString()
  @IsOptional()
  segundoNombre?: string;

  @IsString()
  @IsNotEmpty()
  primerApellido: string;

  @IsString()
  @IsNotEmpty()
  segundoApellido: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;

  @IsInt()
  @IsNotEmpty()
  rolId: number;

  @IsInt()
  @IsNotEmpty()
  departamentoId: number;

  @IsBoolean()
  @IsOptional()
  esInterno?: boolean = true;
}