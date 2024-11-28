import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdtateUserDto } from './dto/update-user-dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(user: User): Promise<{
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
    getOneUser(user: User): Promise<{
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
    udpateUser(user: User, dto: UpdtateUserDto): Promise<void>;
    deleteUser(user: User): Promise<string>;
}
