import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
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
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
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
        };
    }>;
    getProfile(req: any): Promise<any>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    validateResetToken(token: string): Promise<{
        valid: boolean;
        email?: undefined;
    } | {
        valid: boolean;
        email: string;
    }>;
}
