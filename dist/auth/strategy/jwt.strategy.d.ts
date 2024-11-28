import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        id: number;
        first_name: string;
        last_name: string;
        address: string;
        phone: string;
        email: string;
        password: string;
        gdpr: Date;
        created_at: Date;
        updated_at: Date;
        is_active: boolean;
        token: string | null;
        role_id: number;
    }>;
}
export {};
