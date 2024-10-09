import { Module } from '@nestjs/common';
import { DownloadImageService } from './download-image.service';
import { DownloadImageController } from './download-image.controller';

@Module({
  controllers: [DownloadImageController],
  providers: [DownloadImageService],
})
export class DownloadImageModule {}
