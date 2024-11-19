import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
    return this.appointmentService.createAppointment(user.id, dto);
  }

  @UseGuards(JwtGuard)
  @Get('/user')
  getAllUserAppointments(@GetUser() user: User) {
    return this.appointmentService.getAllUserAppointments(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('/admin')
  getAllAppointmentForAmdin(@GetUser() user: User) {
    return this.appointmentService.getAllAppointmentsForAdmin(user.id);
  }

  @Get('/all')
  getAllAppointments() {
    return this.appointmentService.getAllAppointments();
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateAppointment(
    @GetUser() user: User,
    @Body() dto: CreateAppointmentDto,
    @Param('id') appointmentId: string,
  ) {
    return this.appointmentService.updateAppointment(
      user.id,
      dto,
      Number(appointmentId),
    );
  }

  @UseGuards(JwtGuard)
  @Patch('/delete/:id')
  deleteAppointment(@GetUser() user: User, @Param('id') appointmentId: string) {
    return this.appointmentService.deleteAppointment(
      user.id,
      Number(appointmentId),
    );
  }
}
