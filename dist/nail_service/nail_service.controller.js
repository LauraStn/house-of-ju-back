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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NailServiceController = void 0;
const common_1 = require("@nestjs/common");
const nail_service_service_1 = require("./nail_service.service");
const guard_1 = require("../auth/guard");
const decorator_1 = require("../auth/decorator");
const nail_service_dto_1 = require("./dto/nail-service-dto");
let NailServiceController = class NailServiceController {
    constructor(nailServiceService) {
        this.nailServiceService = nailServiceService;
    }
    createNailService(user, dto) {
        return this.nailServiceService.createNailService(user.id, dto);
    }
    async getAllNailServices() {
        return await this.nailServiceService.getAllNailServices();
    }
    getOneNailService(nailServiceId) {
        return this.nailServiceService.getOneNailService(Number(nailServiceId));
    }
    updateNailService(user, dto, nailServiceId) {
        return this.nailServiceService.updateNailService(user.id, dto, Number(nailServiceId));
    }
    deleteNailService(user, nailServiceId) {
        return this.nailServiceService.deleteNailService(user.id, Number(nailServiceId));
    }
};
exports.NailServiceController = NailServiceController;
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, nail_service_dto_1.NailServiceDto]),
    __metadata("design:returntype", void 0)
], NailServiceController.prototype, "createNailService", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NailServiceController.prototype, "getAllNailServices", null);
__decorate([
    (0, common_1.Get)('/one/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NailServiceController.prototype, "getOneNailService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, nail_service_dto_1.NailServiceDto, String]),
    __metadata("design:returntype", void 0)
], NailServiceController.prototype, "updateNailService", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NailServiceController.prototype, "deleteNailService", null);
exports.NailServiceController = NailServiceController = __decorate([
    (0, common_1.Controller)('nail-service'),
    __metadata("design:paramtypes", [nail_service_service_1.NailServiceService])
], NailServiceController);
//# sourceMappingURL=nail_service.controller.js.map