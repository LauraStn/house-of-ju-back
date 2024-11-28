import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth-signup-dto';
import { SigninDto } from './dto/auth-signin-dto';
import { ResetPasswordDto } from './dto/reset-password-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    activeAccount(token: string): Promise<string>;
}
