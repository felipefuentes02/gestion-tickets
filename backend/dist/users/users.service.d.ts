import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        departamento: {
            id: number;
            createdAt: Date;
            nombre: string;
        };
        rol: {
            id: number;
            createdAt: Date;
            nombre: string;
            permisos: import("generated/prisma/runtime/library").JsonValue | null;
        };
        correo: string;
        primerNombre: string;
        segundoNombre: string | null;
        primerApellido: string;
        segundoApellido: string;
        rolId: number;
        departamentoId: number;
        esInterno: boolean;
        id: number;
        ultimoAcceso: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    findAll(): Promise<{
        departamento: {
            id: number;
            createdAt: Date;
            nombre: string;
        };
        rol: {
            id: number;
            createdAt: Date;
            nombre: string;
            permisos: import("generated/prisma/runtime/library").JsonValue | null;
        };
        correo: string;
        primerNombre: string;
        segundoNombre: string | null;
        primerApellido: string;
        segundoApellido: string;
        rolId: number;
        departamentoId: number;
        esInterno: boolean;
        id: number;
        ultimoAcceso: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
    }[]>;
    findOne(id: number): Promise<{
        departamento: {
            id: number;
            createdAt: Date;
            nombre: string;
        };
        rol: {
            id: number;
            createdAt: Date;
            nombre: string;
            permisos: import("generated/prisma/runtime/library").JsonValue | null;
        };
        correo: string;
        primerNombre: string;
        segundoNombre: string | null;
        primerApellido: string;
        segundoApellido: string;
        rolId: number;
        departamentoId: number;
        esInterno: boolean;
        id: number;
        ultimoAcceso: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        departamento: {
            id: number;
            createdAt: Date;
            nombre: string;
        };
        rol: {
            id: number;
            createdAt: Date;
            nombre: string;
            permisos: import("generated/prisma/runtime/library").JsonValue | null;
        };
        correo: string;
        primerNombre: string;
        segundoNombre: string | null;
        primerApellido: string;
        segundoApellido: string;
        rolId: number;
        departamentoId: number;
        esInterno: boolean;
        id: number;
        ultimoAcceso: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findByDepartment(departmentId: number): Promise<{
        departamento: {
            id: number;
            createdAt: Date;
            nombre: string;
        };
        rol: {
            id: number;
            createdAt: Date;
            nombre: string;
            permisos: import("generated/prisma/runtime/library").JsonValue | null;
        };
        correo: string;
        primerNombre: string;
        segundoNombre: string | null;
        primerApellido: string;
        segundoApellido: string;
        rolId: number;
        departamentoId: number;
        esInterno: boolean;
        id: number;
        ultimoAcceso: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
    }[]>;
}
