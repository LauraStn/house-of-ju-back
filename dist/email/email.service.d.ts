import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
export declare class EmailService {
    private readonly config;
    private transporter;
    constructor(config: ConfigService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
    sendResetPassword(user: User, token: string): Promise<void>;
}
