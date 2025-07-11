import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
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
    } & {
        correo: string;
        primerNombre: string;
        segundoNombre: string | null;
        primerApellido: string;
        segundoApellido: string;
        rolId: number;
        departamentoId: number;
        esInterno: boolean;
        id: number;
        hashContrasena: string;
        ultimoAcceso: Date | null;
        createdAt: Date;
        updatedAt: Date | null;
    }>;
}
export {};
