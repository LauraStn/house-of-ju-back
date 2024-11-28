import { DownloadImageService } from './download-image.service';
import { Response } from 'express';
export declare class DownloadImageController {
    private readonly downloadImageService;
    constructor(downloadImageService: DownloadImageService);
    uploadFile(file: Express.Multer.File): string;
    viewImage(filename: string, res: Response): void;
}
