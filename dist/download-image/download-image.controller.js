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
exports.DownloadImageController = void 0;
const download_image_service_1 = require("./download-image.service");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const path_1 = require("path");
const multer_1 = require("multer");
let DownloadImageController = class DownloadImageController {
    constructor(downloadImageService) {
        this.downloadImageService = downloadImageService;
    }
    uploadFile(file) {
        return file.filename;
    }
    viewImage(filename, res) {
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', filename);
        if ((0, fs_1.existsSync)(filePath)) {
            const fileStream = (0, fs_1.createReadStream)(filePath);
            fileStream.pipe(res);
        }
        else {
            res.status(404).json({ message: 'Image not found' });
        }
    }
};
exports.DownloadImageController = DownloadImageController;
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DownloadImageController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('/view/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DownloadImageController.prototype, "viewImage", null);
exports.DownloadImageController = DownloadImageController = __decorate([
    (0, common_1.Controller)('download-image'),
    __metadata("design:paramtypes", [download_image_service_1.DownloadImageService])
], DownloadImageController);
//# sourceMappingURL=download-image.controller.js.map