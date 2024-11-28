import { PrismaService } from 'src/prisma/prisma.service';
import { ImageGalleryDto } from './dto/image_gallery.dto';
export declare class ImageGalleryService {
    private prisma;
    constructor(prisma: PrismaService);
    addImageToGalery(userId: number, dto: ImageGalleryDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllImages(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        image_url: string;
    }[]>;
    deleteImage(userId: number, imageId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
