import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { useContainer } from 'class-validator';
import { getuid } from 'process';
import { UpdtateUserDto } from './dto/update-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  getAllUsers(@GetUser() user: User) {
    return this.userService.getAllUsers(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('/one')
  getOneUser(@GetUser() user: User) {
    return this.userService.getOneUser(user.id)
  }

  @UseGuards(JwtGuard)
  @Patch('/update')
  udpateUser(@GetUser() user: User, @Body() dto: UpdtateUserDto){
    return this.userService.updateUser(user.id, dto)
  }

  @UseGuards(JwtGuard)
  @Delete('/delete')
  deleteUser(@GetUser() user: User) {
    return this.userService.deleteUser(user.id)
  }
}
