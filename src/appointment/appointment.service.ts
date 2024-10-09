import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';

@Injectable()
export class AppointmentService {
    constructor(
        private prisma: PrismaService,
      ) {}

    async createAppointment(userId: number, dto: CreateAppointmentDto){

        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!existingUser || !existingUser.id) {
            throw new ForbiddenException('User not found')
        }
        const existingNailService = await this.prisma.nail_service.findUnique({
            where: {
                id: dto.nail_service_id
            }
        })
        if(!existingNailService || !existingNailService.id) {
            throw new ForbiddenException('Service not found')
        }
        const newAppointment = await this.prisma.appointment.create({
            data: {
                date_time: dto.date_time,
                client_id: existingUser.id,
                nail_service_id: existingNailService.id,
            }
        })
        return newAppointment
    }
}
