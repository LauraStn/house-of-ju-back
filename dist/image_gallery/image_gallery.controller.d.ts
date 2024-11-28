import { ImageGalleryService } from './image_gallery.service';
import { User } from '@prisma/client';
import { ImageGalleryDto } from './dto/image_gallery.dto';
export declare class ImageGalleryController {
    private readonly imageGalleryService;
    constructor(imageGalleryService: ImageGalleryService);
    addImageToGallery(user: User, dto: ImageGalleryDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllImages(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        image_url: string;
    }[]>;
    deleteProduct(user: User, imageId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
