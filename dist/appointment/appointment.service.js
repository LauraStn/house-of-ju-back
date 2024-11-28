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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const checkRole_1 = require("../utils/checkRole");
let AppointmentService = class AppointmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAppointment(userId, dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!existingUser || !existingUser.id) {
            throw new common_1.ForbiddenException('User not found');
        }
        const existingNailService = await this.prisma.nail_service.findUnique({
            where: {
                id: dto.nail_service_id,
            },
        });
        if (!existingNailService || !existingNailService.id) {
            throw new common_1.ForbiddenException('Service not found');
        }
        const newAppointment = await this.prisma.appointment.create({
            data: {
                date: dto.date,
                start: dto.start,
                end: dto.end,
                duration: existingNailService.duration,
                client_id: existingUser.id,
                nail_service_id: existingNailService.id,
            },
        });
        return {
            success: true,
            message: 'Rendez-vous validé',
        };
    }
    async getAllUserAppointments(userId) {
        const id = userId;
        const allAppointments = await this.prisma.$queryRaw `
      SELECT *, Appointment.id
      FROM Appointment 
      JOIN Nail_service 
      ON Appointment.nail_service_id = Nail_service.id 
      WHERE Appointment.client_id = ${id}`;
        return allAppointments;
    }
    async getAllAppointments() {
        const allAppointments = await this.prisma.appointment.findMany({
            orderBy: {
                id: 'asc',
            },
        });
        return allAppointments;
    }
    async getAllAppointmentsForAdmin(userId) {
        await (0, checkRole_1.checkuserIsAdmin)(userId);
        const allAppointmentsForAdmin = await this.prisma.$queryRaw `
      SELECT *, Appointment.id
      FROM Appointment 
      JOIN Nail_service 
      ON Appointment.nail_service_id = Nail_service.id 
      JOIN User 
      ON Appointment.client_id = User.id 
      ORDER BY Appointment.date ASC`;
        return allAppointmentsForAdmin;
    }
    async updateAppointment(userId, dto, appointmentId) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!existingUser || !existingUser.id) {
            throw new common_1.ForbiddenException('User not found');
        }
        const existinAppointment = await this.prisma.appointment.findUnique({
            where: {
                id: appointmentId,
            },
        });
        if (!existinAppointment || !existinAppointment.id) {
            throw new common_1.ForbiddenException('Appointment not found');
        }
        if (existinAppointment.client_id !== existingUser.id ||
            existingUser.role_id === 2) {
            throw new common_1.UnauthorizedException('You are not allowed');
        }
        const editAppointment = await this.prisma.appointment.update({
            where: {
                id: existinAppointment.id,
            },
            data: {
                ...dto,
            },
        });
        return editAppointment;
    }
    async deleteAppointment(userId, appointmentId) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!existingUser || !existingUser.id) {
                throw new common_1.ForbiddenException({
                    success: false,
                    message: 'Utilisateur inconnu',
                });
            }
            const existinAppointment = await this.prisma.appointment.findUnique({
                where: {
                    id: appointmentId,
                },
            });
            if (!existinAppointment || !existinAppointment.id) {
                throw new common_1.ForbiddenException({
                    success: false,
                    message: 'Rendez-vous inexistant',
                });
            }
            if (existinAppointment.client_id !== existingUser.id) {
                throw new common_1.UnauthorizedException({
                    success: false,
                    message: 'Annulation impossible',
                });
            }
            await this.prisma.appointment.delete({
                where: {
                    id: existinAppointment.id,
                },
            });
            return {
                success: true,
                message: 'Rendez-vous annulé',
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur serveur',
            };
        }
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map