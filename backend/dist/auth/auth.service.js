"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingUser = await this.prisma.usuario.findUnique({
            where: { correo: registerDto.correo },
        });
        if (existingUser) {
            throw new common_1.ConflictException('El correo ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(registerDto.contrasena, 10);
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
        const payload = { correo: user.correo, sub: user.id };
        const token = this.jwtService.sign(payload);
        const { hashContrasena, ...userWithoutPassword } = user;
        return {
            access_token: token,
            user: userWithoutPassword,
        };
    }
    async login(loginDto) {
        const user = await this.prisma.usuario.findUnique({
            where: { correo: loginDto.correo },
            include: {
                rol: true,
                departamento: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.contrasena, user.hashContrasena);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        await this.prisma.usuario.update({
            where: { id: user.id },
            data: { ultimoAcceso: new Date() },
        });
        const payload = { correo: user.correo, sub: user.id };
        const token = this.jwtService.sign(payload);
        const { hashContrasena, ...userWithoutPassword } = user;
        return {
            access_token: token,
            user: userWithoutPassword,
        };
    }
    async validateUser(id) {
        return this.prisma.usuario.findUnique({
            where: { id },
            include: {
                rol: true,
                departamento: true,
            },
        });
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.prisma.usuario.findUnique({
            where: { correo: email }
        });
        if (!user) {
            return { message: 'Si el email existe, recibirás un enlace de recuperación' };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        await this.prisma.passwordResetToken.updateMany({
            where: { email, used: false },
            data: { used: true }
        });
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
            token: resetToken
        };
    }
    async resetPassword(resetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token }
        });
        if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Token inválido o expirado');
        }
        const user = await this.prisma.usuario.findUnique({
            where: { correo: resetToken.email }
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.usuario.update({
            where: { id: user.id },
            data: { hashContrasena: hashedPassword }
        });
        await this.prisma.passwordResetToken.update({
            where: { token },
            data: { used: true }
        });
        return { message: 'Contraseña actualizada exitosamente' };
    }
    async validateResetToken(token) {
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token }
        });
        if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
            return { valid: false };
        }
        return { valid: true, email: resetToken.email };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map