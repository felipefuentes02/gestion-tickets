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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const existingUser = await this.prisma.usuario.findUnique({
            where: { correo: createUserDto.correo },
        });
        if (existingUser) {
            throw new common_1.ConflictException('El correo ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.contrasena, 10);
        const { contrasena, ...userDataWithoutPassword } = createUserDto;
        const user = await this.prisma.usuario.create({
            data: {
                ...userDataWithoutPassword,
                hashContrasena: hashedPassword,
            },
            include: {
                rol: true,
                departamento: true,
            },
        });
        const { hashContrasena, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async findAll() {
        const users = await this.prisma.usuario.findMany({
            include: {
                rol: true,
                departamento: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return users.map(({ hashContrasena, ...user }) => user);
    }
    async findOne(id) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
            include: {
                rol: true,
                departamento: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const { hashContrasena, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async update(id, updateUserDto) {
        const existingUser = await this.prisma.usuario.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (updateUserDto.correo && updateUserDto.correo !== existingUser.correo) {
            const emailExists = await this.prisma.usuario.findUnique({
                where: { correo: updateUserDto.correo },
            });
            if (emailExists) {
                throw new common_1.ConflictException('El correo ya está registrado');
            }
        }
        const updatedUser = await this.prisma.usuario.update({
            where: { id },
            data: updateUserDto,
            include: {
                rol: true,
                departamento: true,
            },
        });
        const { hashContrasena, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async remove(id) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        await this.prisma.usuario.delete({
            where: { id },
        });
        return { message: 'Usuario eliminado correctamente' };
    }
    async findByDepartment(departmentId) {
        const users = await this.prisma.usuario.findMany({
            where: { departamentoId: departmentId },
            include: {
                rol: true,
                departamento: true,
            },
        });
        return users.map(({ hashContrasena, ...user }) => user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map