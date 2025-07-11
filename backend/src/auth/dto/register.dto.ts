import { IsEmail, IsNotEmpty, IsString, MinLength, IsBoolean, IsInt } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  primerNombre: string;

  @IsString()
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
  esInterno: boolean = true;
}