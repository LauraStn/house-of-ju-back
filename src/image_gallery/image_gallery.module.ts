import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image_gallery.service';
import { ImageGalleryController } from './image_gallery.controller';

@Module({
  controllers: [ImageGalleryController],
  providers: [ImageGalleryService],
})
export class ImageGalleryModule {}
