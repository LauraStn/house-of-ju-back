import { Module } from '@nestjs/common';
import { NailServiceService } from './nail_service.service';
import { NailServiceController } from './nail_service.controller';

@Module({
  controllers: [NailServiceController],
  providers: [NailServiceService],
})
export class NailServiceModule {}
