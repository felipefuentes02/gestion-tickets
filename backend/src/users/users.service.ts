import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Verificar si el correo ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { correo: createUserDto.correo },
    });

    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.contrasena, 10);

    // Crear el usuario
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

    // Remover la contraseña hasheada de la respuesta
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

    // Remover contraseñas de la respuesta
    return users.map(({ hashContrasena, ...user }) => user);
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        rol: true,
        departamento: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { hashContrasena, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Verificar que el usuario existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Si se está actualizando el correo, verificar que no exista
    if (updateUserDto.correo && updateUserDto.correo !== existingUser.correo) {
      const emailExists = await this.prisma.usuario.findUnique({
        where: { correo: updateUserDto.correo },
      });

      if (emailExists) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

    // Actualizar el usuario
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

  async remove(id: number) {
    // Verificar que el usuario existe
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Eliminar el usuario
    await this.prisma.usuario.delete({
      where: { id },
    });

    return { message: 'Usuario eliminado correctamente' };
  }

  async findByDepartment(departmentId: number) {
    const users = await this.prisma.usuario.findMany({
      where: { departamentoId: departmentId },
      include: {
        rol: true,
        departamento: true,
      },
    });

    return users.map(({ hashContrasena, ...user }) => user);
  }
}