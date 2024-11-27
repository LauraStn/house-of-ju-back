import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ImageGalleryService } from './image_gallery.service';
import { JwtGuard } from 'src/auth/guard';
import { User } from '@prisma/client';
import { ImageGalleryDto } from './dto/image_gallery.dto';
import { GetUser } from 'src/auth/decorator';

@Controller('image-gallery')
export class ImageGalleryController {
  constructor(private readonly imageGalleryService: ImageGalleryService) {}

  @UseGuards(JwtGuard)
  @Post('/add')
  addImageToGallery(@GetUser() user: User, @Body() dto: ImageGalleryDto) {
    return this.imageGalleryService.addImageToGalery(user.id, dto);
  }

  @Get('all')
  getAllImages() {
    return this.imageGalleryService.getAllImages();
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteProduct(@GetUser() user: User, @Param('id') imageId: string) {
    return this.imageGalleryService.deleteImage(user.id, Number(imageId));
  }
}
