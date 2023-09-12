import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileResDto } from './dtos/userProfileRes.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/:userId')
  async getUserProfileById(
    @Param('userId') userId: number,
  ): Promise<UserProfileResDto> {
    return this.userService.getUserProfileById(userId);
  }

  @Get('/profile/my')
  async getMyProfile(@Param('userId') userId: number) {
    return this.userService.getMyProfile(userId);
  }

  @Patch('/modify/:userId')
  async modifyUser(@Param('userId') userId: number, @Body() modifyUserDto) {}
}
