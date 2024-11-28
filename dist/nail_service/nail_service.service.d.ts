import { NailServiceDto } from './dto/nail-service-dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class NailServiceService {
    private prisma;
    constructor(prisma: PrismaService);
    createNailService(userId: number, dto: NailServiceDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateNailService(userId: number, dto: NailServiceDto, nailServiceId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllNailServices(): Promise<unknown>;
    getOneNailService(nailServiceId: number): Promise<{
        id: number;
        name: string;
        description: string;
        duration: number;
        price: number;
    }>;
    deleteNailService(userId: number, nailServiceId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
