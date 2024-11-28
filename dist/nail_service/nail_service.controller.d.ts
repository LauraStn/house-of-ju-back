import { NailServiceService } from './nail_service.service';
import { User } from '@prisma/client';
import { NailServiceDto } from './dto/nail-service-dto';
export declare class NailServiceController {
    private readonly nailServiceService;
    constructor(nailServiceService: NailServiceService);
    createNailService(user: User, dto: NailServiceDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllNailServices(): Promise<unknown>;
    getOneNailService(nailServiceId: string): Promise<{
        id: number;
        name: string;
        description: string;
        duration: number;
        price: number;
    }>;
    updateNailService(user: User, dto: NailServiceDto, nailServiceId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteNailService(user: User, nailServiceId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
