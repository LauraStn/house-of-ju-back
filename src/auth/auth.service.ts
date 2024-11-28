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
import { Roles } from 'src/utils/const/const';
import * as crypto from 'crypto';
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
      throw new ForbiddenException('Cet email est déjà associé à un compte');
    }

    const userRole = await this.prisma.role.findFirst({
      where: {
        name: Roles.USER,
      },
    });
    const existingPhone = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });
    if (existingPhone) {
      throw new ForbiddenException(
        'Ce numéro de téléphone est déjà associé à un compte',
      );
    }
    const activationToken = crypto.randomBytes(72).toString('hex');

    const hashedPassword = await argon.hash(dto.password);
    console.log(activationToken);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        first_name: dto.first_name,
        last_name: dto.last_name,
        address: dto.address,
        phone: dto.phone,
        role_id: userRole.id,
        password: hashedPassword,
        token: activationToken,
      },
    });
    await this.emailService.sendUserConfirmation(newUser, activationToken);
    return 'Veuillez cliquer sur le lien reçu par mail pour activer votre compte';
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
    console.log("user", user);
    
    const token = await this.signToken(user.id);
    return {
      statusCode: 201,
      message: 'Connecté ! Redirection vers le profil',
      token,
      isAdmin: user.role_id === 2,
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
      throw new ForbiddenException({
        success: false,
        message: 'Email introuvable',
      });
    }
    const activationToken = crypto.randomBytes(72).toString('hex');
    const udpateUserToken = await this.prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        token: activationToken,
      },
    });
    await this.emailService.sendResetPassword(existingUser, activationToken);
    return {
      success: true,
      message: 'Un email de réinitialisation de mot de passe vous a été envoyé',
    };
  }
}
