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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketsService = class TicketsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTicketDto) {
        try {
            const numeroTicket = await this.generateTicketNumber();
            const ticket = await this.prisma.ticket.create({
                data: {
                    numeroTicket: numeroTicket,
                    asunto: createTicketDto.asunto,
                    descripcion: createTicketDto.descripcion,
                    solicitanteId: createTicketDto.solicitanteId,
                    departamentoId: createTicketDto.departamentoId,
                    prioridadId: createTicketDto.prioridadId,
                    estadoId: 1,
                },
                include: {
                    solicitante: {
                        select: {
                            id: true,
                            primerNombre: true,
                            primerApellido: true,
                            correo: true,
                        },
                    },
                    departamento: {
                        select: {
                            id: true,
                            nombre: true,
                        },
                    },
                    prioridad: {
                        select: {
                            id: true,
                            nombre: true,
                            nivel: true,
                        },
                    },
                    estado: {
                        select: {
                            id: true,
                            nombre: true,
                        },
                    },
                },
            });
            return ticket;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al crear el ticket: ' + error.message);
        }
    }
    async findAll() {
        return this.prisma.ticket.findMany({
            include: {
                solicitante: {
                    select: {
                        id: true,
                        primerNombre: true,
                        primerApellido: true,
                        correo: true,
                    },
                },
                departamento: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
                prioridad: {
                    select: {
                        id: true,
                        nombre: true,
                        nivel: true,
                    },
                },
                estado: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
            include: {
                solicitante: {
                    select: {
                        id: true,
                        primerNombre: true,
                        primerApellido: true,
                        correo: true,
                    },
                },
                asignado: {
                    select: {
                        id: true,
                        primerNombre: true,
                        primerApellido: true,
                        correo: true,
                    },
                },
                departamento: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
                prioridad: {
                    select: {
                        id: true,
                        nombre: true,
                        nivel: true,
                    },
                },
                estado: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
                comentarios: {
                    include: {
                        usuario: {
                            select: {
                                id: true,
                                primerNombre: true,
                                primerApellido: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket con ID ${id} no encontrado`);
        }
        return ticket;
    }
    async update(id, updateTicketDto) {
        try {
            const ticket = await this.prisma.ticket.update({
                where: { id },
                data: updateTicketDto,
                include: {
                    solicitante: {
                        select: {
                            id: true,
                            primerNombre: true,
                            primerApellido: true,
                            correo: true,
                        },
                    },
                    departamento: {
                        select: {
                            id: true,
                            nombre: true,
                        },
                    },
                    prioridad: {
                        select: {
                            id: true,
                            nombre: true,
                            nivel: true,
                        },
                    },
                    estado: {
                        select: {
                            id: true,
                            nombre: true,
                        },
                    },
                },
            });
            return ticket;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Ticket con ID ${id} no encontrado`);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.ticket.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Ticket con ID ${id} no encontrado`);
        }
    }
    async generateTicketNumber() {
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const lastTicket = await this.prisma.ticket.findFirst({
            where: {
                numeroTicket: {
                    startsWith: `TK${year}${month}`,
                },
            },
            orderBy: {
                numeroTicket: 'desc',
            },
        });
        let nextNumber = 1;
        if (lastTicket) {
            const lastNumber = parseInt(lastTicket.numeroTicket.slice(-4));
            nextNumber = lastNumber + 1;
        }
        return `TK${year}${month}${String(nextNumber).padStart(4, '0')}`;
    }
    async findByUser(userId) {
        return this.prisma.ticket.findMany({
            where: {
                solicitanteId: userId,
            },
            include: {
                departamento: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
                prioridad: {
                    select: {
                        id: true,
                        nombre: true,
                        nivel: true,
                    },
                },
                estado: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findByDepartment(departmentId) {
        return this.prisma.ticket.findMany({
            where: {
                departamentoId: departmentId,
            },
            include: {
                solicitante: {
                    select: {
                        id: true,
                        primerNombre: true,
                        primerApellido: true,
                        correo: true,
                    },
                },
                prioridad: {
                    select: {
                        id: true,
                        nombre: true,
                        nivel: true,
                    },
                },
                estado: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.TicketsService = TicketsService;
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map