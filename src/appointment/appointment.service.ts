import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { checkuserIsAdmin } from 'src/utils/checkRole';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(userId: number, dto: CreateAppointmentDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException('User not found');
    }
    const existingNailService = await this.prisma.nail_service.findUnique({
      where: {
        id: dto.nail_service_id,
      },
    });
    if (!existingNailService || !existingNailService.id) {
      throw new ForbiddenException('Service not found');
    }
    const newAppointment = await this.prisma.appointment.create({
      data: {
        date: dto.date,
        start: dto.start,
        end: dto.end,
        duration: existingNailService.duration,
        client_id: existingUser.id,
        nail_service_id: existingNailService.id,
      },
    });
    return {
      success: true,
      message: 'Rendez-vous validé',
    };
  }

  async getAllUserAppointments(userId: number) {
    const id = userId;
    const allAppointments = await this.prisma.$queryRaw`
      SELECT *, Appointment.id
      FROM Appointment 
      JOIN Nail_service 
      ON Appointment.nail_service_id = Nail_service.id 
      WHERE Appointment.client_id = ${id}`;
    return allAppointments;
  }

  async getAllAppointments() {
    const allAppointments = await this.prisma.appointment.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return allAppointments;
  }

  async getAllAppointmentsForAdmin(userId: number) {
    await checkuserIsAdmin(userId);
    const allAppointmentsForAdmin = await this.prisma.$queryRaw`
      SELECT *, Appointment.id
      FROM Appointment 
      JOIN Nail_service 
      ON Appointment.nail_service_id = Nail_service.id 
      JOIN User 
      ON Appointment.client_id = User.id 
      ORDER BY Appointment.date ASC`;
    return allAppointmentsForAdmin;
  }

  async updateAppointment(
    userId: number,
    dto: CreateAppointmentDto,
    appointmentId: number,
  ) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException('User not found');
    }
    const existinAppointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });
    if (!existinAppointment || !existinAppointment.id) {
      throw new ForbiddenException('Appointment not found');
    }
    if (
      existinAppointment.client_id !== existingUser.id ||
      existingUser.role_id === 2
    ) {
      throw new UnauthorizedException('You are not allowed');
    }
    const editAppointment = await this.prisma.appointment.update({
      where: {
        id: existinAppointment.id,
      },
      data: {
        ...dto,
      },
    });
    return editAppointment;
  }

  async deleteAppointment(userId: number, appointmentId: number) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!existingUser || !existingUser.id) {
        throw new ForbiddenException({
          success: false,
          message: 'Utilisateur inconnu',
        });
      }
      const existinAppointment = await this.prisma.appointment.findUnique({
        where: {
          id: appointmentId,
        },
      });
      if (!existinAppointment || !existinAppointment.id) {
        throw new ForbiddenException({
          success: false,
          message: 'Rendez-vous inexistant',
        });
      }
      if (existinAppointment.client_id !== existingUser.id) {
        throw new UnauthorizedException({
          success: false,
          message: 'Annulation impossible',
        });
      }
      await this.prisma.appointment.delete({
        where: {
          id: existinAppointment.id,
        },
      });
      return {
        success: true,
        message: 'Rendez-vous annulé',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur serveur',
      };
    }
  }

}
