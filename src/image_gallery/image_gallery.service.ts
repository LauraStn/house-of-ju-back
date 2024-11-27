import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageGalleryDto } from './dto/image_gallery.dto';
import { checkuserIsAdmin } from 'src/utils/checkRole';

@Injectable()
export class ImageGalleryService {
  constructor(private prisma: PrismaService) {}

  async addImageToGalery(userId: number, dto: ImageGalleryDto) {
    await checkuserIsAdmin(userId);

    const newImage = await this.prisma.image_gallery.create({
      data: {
        ...dto,
      },
    });
    return {
      success: true,
      message: 'image ajoutée à la galerie',
    };
  }

  getAllImages() {
    return this.prisma.image_gallery.findMany({
      take: 20,
    });
  }

  async deleteImage(userId: number, imageId: number) {
    await checkuserIsAdmin(userId);

    const existingImage = await this.prisma.image_gallery.findUnique({
      where: {
        id: imageId,
      },
    });
    if (!existingImage || !existingImage.id) {
      throw new ForbiddenException('does not exist');
    }
    await this.prisma.image_gallery.delete({
      where: {
        id: existingImage.id,
      },
    });
    return {
      success: true,
      message: 'Image supprimée',
    };
  }
}
