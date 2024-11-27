import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NailServiceService } from './nail_service.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { NailServiceDto } from './dto/nail-service-dto';

@Controller('nail-service')
export class NailServiceController {
  constructor(private readonly nailServiceService: NailServiceService) {}

  @UseGuards(JwtGuard)
  @Post('/add')
  createNailService(@GetUser() user: User, @Body() dto: NailServiceDto) {
    return this.nailServiceService.createNailService(user.id, dto);
  }

  @Get('/all')
  async getAllNailServices() {
    return await this.nailServiceService.getAllNailServices();
  }

  @Get('/one/:id')
  getOneNailService(@Param('id') nailServiceId: string) {
    return this.nailServiceService.getOneNailService(Number(nailServiceId));
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateNailService(
    @GetUser() user: User,
    @Body() dto: NailServiceDto,
    @Param('id') nailServiceId: string,
  ) {
    return this.nailServiceService.updateNailService(
      user.id,
      dto,
      Number(nailServiceId),
    );
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteNailService(@GetUser() user: User, @Param('id') nailServiceId: string) {
    return this.nailServiceService.deleteNailService(
      user.id,
      Number(nailServiceId),
    );
  }
}
