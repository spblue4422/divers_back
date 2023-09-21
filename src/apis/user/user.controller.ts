import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get('/doubleCheck/nickname/:nickname')
  async doubleCheckNickname(@Param() nickname: string) {}

  @Patch('/change/profileImage')
  async changeProfileImage(@Body() changeProfImgBody) {}

  //큰일남. 사용할 수 있는 api가 없네 엄.
  @Post('/certificate/rank')
  async certificateDiveRank() {}
}
