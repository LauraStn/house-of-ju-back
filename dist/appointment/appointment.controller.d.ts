import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
import { User } from '@prisma/client';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    createAppointment(user: User, dto: CreateAppointmentDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllUserAppointments(user: User): Promise<unknown>;
    getAllAppointmentForAmdin(user: User): Promise<unknown>;
    getAllAppointments(): Promise<{
        id: number;
        date: string;
        start: string;
        end: string;
        duration: number;
        client_id: number;
        nail_service_id: number;
    }[]>;
    updateAppointment(user: User, dto: CreateAppointmentDto, appointmentId: string): Promise<{
        id: number;
        date: string;
        start: string;
        end: string;
        duration: number;
        client_id: number;
        nail_service_id: number;
    }>;
    deleteAppointment(user: User, appointmentId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
