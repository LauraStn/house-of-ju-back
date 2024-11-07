import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkuserIsAdmin } from 'src/utils/checkRole';
import { NailServiceDto } from './dto/nail-service-dto';

@Injectable()
export class NailServiceService {
  constructor(private prisma: PrismaService) {}

  async createNailService(userId: number, dto: NailServiceDto) {
    await checkuserIsAdmin(userId);

    const newNailService = await this.prisma.nail_service.create({
      data: {
        ...dto,
      },
    });
    return newNailService;
  }

  async updateNailService(
    userId: number,
    dto: NailServiceDto,
    nailServiceId: number,
  ) {
    await checkuserIsAdmin(userId);

    const existingNailService = await this.prisma.nail_service.findUnique({
      where: {
        id: nailServiceId,
      },
    });
    if (!existingNailService || !existingNailService.id) {
      throw new ForbiddenException('Not found');
    }
    const updateExistingNailService = await this.prisma.nail_service.update({
      where: {
        id: existingNailService.id,
      },
      data: {
        name: dto.name,
        description: dto.description,
        duration: dto.duration,
        price: dto.price,
      },
    });
    return updateExistingNailService;
  }

  async getAllNailServices() {
    return await this.prisma.$queryRaw`SELECT * FROM Nail_service`;
  }

  async getOneNailService(nailServiceId: number) {
    return this.prisma.nail_service.findUnique({
      where: {
        id: nailServiceId,
      },
    });
  }

  async deleteNailService(userId: number, nailServiceId: number) {
    await checkuserIsAdmin(userId);

    const existingNailService = await this.prisma.nail_service.findUnique({
      where: {
        id: nailServiceId,
      },
    });
    if (!existingNailService || !existingNailService.id) {
      throw new ForbiddenException('Not found');
    }
    await this.prisma.nail_service.delete({
      where: {
        id: existingNailService.id,
      },
    });
    return 'Deleted';
  }
}
