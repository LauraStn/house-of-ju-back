import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NailServiceModule } from './nail_service/nail_service.module';
import { ImageGalleryModule } from './image_gallery/image_gallery.module';
import { DownloadImageModule } from './download-image/download-image.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    NailServiceModule,
    ImageGalleryModule,
    DownloadImageModule,
    DownloadImageModule,
    AppointmentModule,
  ],
})
export class AppModule {}
