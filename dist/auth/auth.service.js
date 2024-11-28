"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const email_service_1 = require("../email/email.service");
const config_1 = require("@nestjs/config");
const const_1 = require("../utils/const/const");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(prisma, jwt, config, emailService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.emailService = emailService;
    }
    async signup(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (existingUser) {
            throw new common_1.ForbiddenException('Cet email est déjà associé à un compte');
        }
        const userRole = await this.prisma.role.findFirst({
            where: {
                name: const_1.Roles.USER,
            },
        });
        const existingPhone = await this.prisma.user.findUnique({
            where: {
                phone: dto.phone,
            },
        });
        if (existingPhone) {
            throw new common_1.ForbiddenException('Ce numéro de téléphone est déjà associé à un compte');
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
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException('Email inconnu');
        }
        if (user.is_active === false) {
            throw new common_1.ForbiddenException('Compte inactif');
        }
        const isValidPassword = await argon.verify(user.password, dto.password);
        if (!isValidPassword) {
            throw new common_1.ForbiddenException('Mot de passe incorrect');
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
    async signToken(userId) {
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
    async activateAccount(token) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                token: token,
            },
        });
        if (!existingUser || existingUser.token === null) {
            throw new common_1.ForbiddenException('Link expired');
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
    async resetPassword(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!existingUser) {
            throw new common_1.ForbiddenException({
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map