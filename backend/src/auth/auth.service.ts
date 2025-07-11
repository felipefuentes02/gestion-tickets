import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { correo: registerDto.correo },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.contrasena, 10);

    // Crear el usuario
    const user = await this.prisma.usuario.create({
      data: {
        primerNombre: registerDto.primerNombre,
        segundoNombre: registerDto.segundoNombre,
        primerApellido: registerDto.primerApellido,
        segundoApellido: registerDto.segundoApellido,
        correo: registerDto.correo,
        hashContrasena: hashedPassword,
        rolId: registerDto.rolId,
        departamentoId: registerDto.departamentoId,
        esInterno: registerDto.esInterno,
      },
      include: {
        rol: true,
        departamento: true,
      },
    });

    // Generar token
    const payload = { correo: user.correo, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Remover la contraseña de la respuesta
    const { hashContrasena, ...userWithoutPassword } = user;

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async login(loginDto: LoginDto) {
    // Buscar el usuario
    const user = await this.prisma.usuario.findUnique({
      where: { correo: loginDto.correo },
      include: {
        rol: true,
        departamento: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(
      loginDto.contrasena,
      user.hashContrasena,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar último acceso
    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { ultimoAcceso: new Date() },
    });

    // Generar token
    const payload = { correo: user.correo, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Remover la contraseña de la respuesta
    const { hashContrasena, ...userWithoutPassword } = user;

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async validateUser(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: {
        rol: true,
        departamento: true,
      },
    });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    // Verificar si el usuario existe (usando el modelo correcto)
    const user = await this.prisma.usuario.findUnique({
      where: { correo: email }
    });

    if (!user) {
      return { message: 'Si el email existe, recibirás un enlace de recuperación' };
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Expira en 1 hora

    // Invalidar tokens anteriores del mismo email
    await this.prisma.passwordResetToken.updateMany({
      where: { email, used: false },
      data: { used: true }
    });

    // Crear nuevo token
    await this.prisma.passwordResetToken.create({
      data: {
        email,
        token: resetToken,
        expiresAt
      }
    });

    console.log(`Token de recuperación para ${email}: ${resetToken}`);
    
    return { 
      message: 'Si el email existe, recibirás un enlace de recuperación',
      token: resetToken // Solo para desarrollo
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    // Buscar el token
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Token inválido o expirado');
    }

    // Buscar el usuario (usando el modelo correcto)
    const user = await this.prisma.usuario.findUnique({
      where: { correo: resetToken.email }
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario (usando el campo correcto)
    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { hashContrasena: hashedPassword }
    });

    // Marcar el token como usado
    await this.prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    });

    return { message: 'Contraseña actualizada exitosamente' };
  }

  async validateResetToken(token: string) {
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      return { valid: false };
    }

    return { valid: true, email: resetToken.email };
  }
}