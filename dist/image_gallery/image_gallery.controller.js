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
exports.ImageGalleryController = void 0;
const common_1 = require("@nestjs/common");
const image_gallery_service_1 = require("./image_gallery.service");
const guard_1 = require("../auth/guard");
const image_gallery_dto_1 = require("./dto/image_gallery.dto");
const decorator_1 = require("../auth/decorator");
let ImageGalleryController = class ImageGalleryController {
    constructor(imageGalleryService) {
        this.imageGalleryService = imageGalleryService;
    }
    addImageToGallery(user, dto) {
        return this.imageGalleryService.addImageToGalery(user.id, dto);
    }
    getAllImages() {
        return this.imageGalleryService.getAllImages();
    }
    deleteProduct(user, imageId) {
        return this.imageGalleryService.deleteImage(user.id, Number(imageId));
    }
};
exports.ImageGalleryController = ImageGalleryController;
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, image_gallery_dto_1.ImageGalleryDto]),
    __metadata("design:returntype", void 0)
], ImageGalleryController.prototype, "addImageToGallery", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImageGalleryController.prototype, "getAllImages", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ImageGalleryController.prototype, "deleteProduct", null);
exports.ImageGalleryController = ImageGalleryController = __decorate([
    (0, common_1.Controller)('image-gallery'),
    __metadata("design:paramtypes", [image_gallery_service_1.ImageGalleryService])
], ImageGalleryController);
//# sourceMappingURL=image_gallery.controller.js.map