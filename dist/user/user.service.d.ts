import { PrismaService } from 'src/prisma/prisma.service';
import { UpdtateUserDto } from './dto/update-user-dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(userId: number): Promise<{
        id: number;
        first_name: string;
        last_name: string;
        address: string;
        phone: string;
        email: string;
        is_active: boolean;
        role_id: number;
        appointments: {
            id: number;
            date: string;
            start: string;
            end: string;
            duration: number;
            client_id: number;
            nail_service_id: number;
        }[];
    }[]>;
    getOneUser(userId: number): Promise<{
        isAdmin: boolean;
        id: number;
        first_name: string;
        last_name: string;
        address: string;
        phone: string;
        email: string;
        is_active: boolean;
        role_id: number;
        appointments: {
            id: number;
            date: string;
            start: string;
            end: string;
            duration: number;
            client_id: number;
            nail_service_id: number;
        }[];
    }>;
    updateUser(userId: number, dto: UpdtateUserDto): Promise<void>;
    deleteUser(userId: number): Promise<string>;
}
