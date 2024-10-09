import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtGuard)
  @Post('/add')
  createAppointment(@GetUser() user: User, @Body() dto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(user.id, dto)
  }
}
