import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/auth-signup-dto';
import * as argon from 'argon2';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from './dto/auth-signin-dto';

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
    const hash = await argon.hash(dto.password);
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

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        first_name: dto.first_name,
        last_name: dto.last_name,
        address: dto.address,
        phone: dto.phone,
        role_id: userRole.id,
        password: hash,
        token: cleanToken,
      },
    });
    await this.emailService.sendUserConfirmation(newUser, cleanToken);
    return 'Email sent with link to activate your account';
  }

  async signin(dto: SigninDto){
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    if (!user) {
      throw new ForbiddenException('Invalid crendentials');
    }
    if (user.is_active === false) {
      throw new ForbiddenException('Inactive account');
    }
    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid crendentials');
    }
    const token = await this.signToken(user.id);
    return {
      token,
      role: user.role_id,
    };
  }

  async signToken(userId: number): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
