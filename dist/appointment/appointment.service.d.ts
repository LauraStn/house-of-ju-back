import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment-dto';
export declare class AppointmentService {
    private prisma;
    constructor(prisma: PrismaService);
    createAppointment(userId: number, dto: CreateAppointmentDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllUserAppointments(userId: number): Promise<unknown>;
    getAllAppointments(): Promise<{
        id: number;
        date: string;
        start: string;
        end: string;
        duration: number;
        client_id: number;
        nail_service_id: number;
    }[]>;
    getAllAppointmentsForAdmin(userId: number): Promise<unknown>;
    updateAppointment(userId: number, dto: CreateAppointmentDto, appointmentId: number): Promise<{
        id: number;
        date: string;
        start: string;
        end: string;
        duration: number;
        client_id: number;
        nail_service_id: number;
    }>;
    deleteAppointment(userId: number, appointmentId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
