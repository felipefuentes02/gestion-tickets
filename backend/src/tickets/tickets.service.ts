import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      // Generar número de ticket único
      const numeroTicket = await this.generateTicketNumber();

      const ticket = await this.prisma.ticket.create({
        data: {
          numeroTicket: numeroTicket,
          asunto: createTicketDto.asunto,
          descripcion: createTicketDto.descripcion,
          solicitanteId: createTicketDto.solicitanteId,
          departamentoId: createTicketDto.departamentoId,
          prioridadId: createTicketDto.prioridadId,
          estadoId: 1, // Estado inicial "Nuevo"
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
    } catch (error) {
      throw new BadRequestException('Error al crear el ticket: ' + error.message);
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

  async findOne(id: number) {
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
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
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
    } catch (error) {
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ticket.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }
  }

  // Método para generar número de ticket único
  private async generateTicketNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    
    // Buscar el último ticket del mes actual
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

  // Método para buscar tickets por usuario
  async findByUser(userId: number) {
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

  // Método para buscar tickets por departamento
  async findByDepartment(departmentId: number) {
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
}