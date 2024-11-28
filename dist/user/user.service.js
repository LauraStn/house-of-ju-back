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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const checkRole_1 = require("../utils/checkRole");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers(userId) {
        await (0, checkRole_1.checkuserIsAdmin)(userId);
        return this.prisma.user.findMany({
            orderBy: {
                created_at: 'desc',
            },
            take: 20,
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                address: true,
                phone: true,
                is_active: true,
                role_id: true,
                appointments: true,
            },
        });
    }
    async getOneUser(userId) {
        const userLogged = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                address: true,
                phone: true,
                is_active: true,
                role_id: true,
                appointments: true,
            },
        });
        return { ...userLogged, isAdmin: userLogged.role_id === 2 };
    }
    async updateUser(userId, dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!existingUser || !existingUser.id) {
            throw new common_1.ForbiddenException('User not found');
        }
        await this.prisma.user.update({
            where: {
                id: existingUser.id,
            },
            data: {
                ...dto,
            },
        });
    }
    async deleteUser(userId) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!existingUser || !existingUser.id) {
            throw new common_1.ForbiddenException('User not found');
        }
        await this.prisma.user.delete({
            where: {
                id: existingUser.id,
            },
        });
        return 'Account successfully deleted';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map