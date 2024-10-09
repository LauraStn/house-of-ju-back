import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkuserIsAdmin } from 'src/utils/checkRole';
import { UpdtateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
      ) {}

    async getAllUsers(userId: number) {
        await checkuserIsAdmin(userId);
        return this.prisma.user.findMany({
          orderBy: {
            created_at: 'desc',
          },
          take: 20,
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            address: true,
            phone: true,
            is_active: true,
            role_id: true,
            appointments: true
          },
        });
    }

    async getOneUser(userId: number) {
        return this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                address: true,
                phone: true,
                is_active: true,
                role_id: true,
                appointments: true
              },
        })
    }

    async updateUser(userId: number, dto: UpdtateUserDto){
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!existingUser || !existingUser.id) {
            throw new ForbiddenException('User not found')
        }
        await this.prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                ...dto
            }
        })
    }

    async deleteUser(userId: number){
        const existingUser = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!existingUser || !existingUser.id) {
            throw new ForbiddenException('User not found')
        }
        await this.prisma.user.delete({
            where: {
                id: existingUser.id
            }
        })
        return 'Account successfully deleted'
    }
}
