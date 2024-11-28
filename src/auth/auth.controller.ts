import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/auth-signup-dto';
import { SigninDto } from './dto/auth-signin-dto';
import { ResetPasswordDto } from './dto/reset-password-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto: SigninDto) {
    console.log('dto', dto);

    return this.authService.signin(dto);
  }

  @Post('/reset')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Patch('/activate/:token')
  activeAccount(@Param('token') token: string) {
    return this.authService.activateAccount(token);
  }
}
