import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/:userId')
  async getUserProfileById(@Param('userId') userId: number) {}

  @Get('/profile/my')
  async getMyProfile() {}

  @Patch('/modify/:userId')
  async modifyUser(@Param('userId') userId: number, @Body() modifyUserDto) {}
}
