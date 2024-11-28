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
exports.NailServiceService = void 0;
const common_1 = require("@nestjs/common");
const checkRole_1 = require("../utils/checkRole");
const prisma_service_1 = require("../prisma/prisma.service");
let NailServiceService = class NailServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNailService(userId, dto) {
        await (0, checkRole_1.checkuserIsAdmin)(userId);
        const newNailService = await this.prisma.nail_service.create({
            data: {
                ...dto,
            },
        });
        return {
            success: true,
            message: 'Prestation ajoutée',
        };
    }
    async updateNailService(userId, dto, nailServiceId) {
        await (0, checkRole_1.checkuserIsAdmin)(userId);
        const existingNailService = await this.prisma.nail_service.findUnique({
            where: {
                id: nailServiceId,
            },
        });
        if (!existingNailService || !existingNailService.id) {
            throw new common_1.ForbiddenException('Not found');
        }
        const updateExistingNailService = await this.prisma.nail_service.update({
            where: {
                id: existingNailService.id,
            },
            data: {
                name: dto.name,
                description: dto.description,
                duration: dto.duration,
                price: dto.price,
            },
        });
        return {
            success: true,
            message: 'Prestation modifiée',
        };
    }
    async getAllNailServices() {
        return await this.prisma.$queryRaw `SELECT * FROM Nail_service`;
    }
    async getOneNailService(nailServiceId) {
        return this.prisma.nail_service.findUnique({
            where: {
                id: nailServiceId,
            },
        });
    }
    async deleteNailService(userId, nailServiceId) {
        await (0, checkRole_1.checkuserIsAdmin)(userId);
        const existingNailService = await this.prisma.nail_service.findUnique({
            where: {
                id: nailServiceId,
            },
        });
        if (!existingNailService || !existingNailService.id) {
            throw new common_1.ForbiddenException('Not found');
        }
        await this.prisma.nail_service.delete({
            where: {
                id: existingNailService.id,
            },
        });
        return {
            success: true,
            message: 'Prestation supprimée',
        };
    }
};
exports.NailServiceService = NailServiceService;
exports.NailServiceService = NailServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NailServiceService);
//# sourceMappingURL=nail_service.service.js.map