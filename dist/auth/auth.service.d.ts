import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/auth-signup-dto';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from './dto/auth-signin-dto';
import { ResetPasswordDto } from './dto/reset-password-dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private emailService;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, emailService: EmailService);
    signup(dto: SignupDto): Promise<string>;
    signin(dto: SigninDto): Promise<{
        statusCode: number;
        message: string;
        token: {
            access_token: string;
        };
        isAdmin: boolean;
        role: number;
    }>;
    signToken(userId: number): Promise<{
        access_token: string;
    }>;
    activateAccount(token: string): Promise<string>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
