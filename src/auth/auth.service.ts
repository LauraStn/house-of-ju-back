import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/auth-signup-dto';
import * as argon from 'argon2';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from './dto/auth-signin-dto';
import { ResetPasswordDto } from './dto/reset-password-dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already taken');
    }

    const userRole = await this.prisma.role.findUnique({
      where: {
        id: 2,
      },
    });
    const existingPhone = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });
    if (existingPhone) {
      throw new ForbiddenException('Phone number already taken');
    }
    const activationToken = await argon.hash(`${dto.email}+${dto.phone}`);
    const cleanToken = activationToken.replaceAll('/', 'j');

    const hashedPassword = await argon.hash(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        first_name: dto.first_name,
        last_name: dto.last_name,
        address: dto.address,
        phone: dto.phone,
        role_id: userRole.id,
        password: hashedPassword,
        token: cleanToken,
      },
    });
    await this.emailService.sendUserConfirmation(newUser, cleanToken);
    return 'Email sent with link to activate your account';
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email inconnu');
    }
    if (user.is_active === false) {
      throw new ForbiddenException('Compte inactif');
    }
    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Mot de passe incorrect');
    }

    const token = await this.signToken(user.id);
    return {
      token,
      isAdmin: user.role_id === 1,
      role: user.role_id,
    };
  }

  async signToken(userId: number): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async activateAccount(token: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!existingUser || existingUser.token === null) {
      throw new ForbiddenException('Link expired');
    }
    await this.prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        token: null,
        is_active: true,
      },
    });
    return 'Account activate you can now log in';
  }

  async resetPassword(dto: ResetPasswordDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!existingUser) {
      throw new ForbiddenException('Email not found');
    }
    const activationToken = await argon.hash(
      `${existingUser.email}+${existingUser.phone}`,
    );
    const cleanToken = activationToken.replaceAll('/', '');
    const udpateUserToken = await this.prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        token: cleanToken,
      },
    });
    await this.emailService.sendResetPassword(existingUser, cleanToken);
    return 'Email sent with link to reset your password';
  }
}
