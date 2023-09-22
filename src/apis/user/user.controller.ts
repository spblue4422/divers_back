import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { modifyUserProfileReqDto } from './dtos/modifyUserProfileReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { MyProfileResDto } from './dtos/myProfileRes.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserProfileResDto,
    description: '유저 프로필 확인',
  })
  @Get('/profile/:userId')
  async getUserProfile(
    @Param('userId') userId: number,
  ): Promise<UserProfileResDto> {
    return this.userService.getUserProfileById(userId);
  }

  @ApiOkResponse({
    type: MyProfileResDto,
    description: '자신 프로필 확인',
  })
  @Get('/profile/my')
  async getMyProfile(
    @Param('userId') userId: number,
  ): Promise<MyProfileResDto> {
    return this.userService.getMyProfile(userId);
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 변경',
  })
  @Patch('/modify/:userId')
  async modifyUserProfile(
    @Param('userId') userId: number,
    @Body() modifyUserBody: modifyUserProfileReqDto,
  ): Promise<MsgResDto> {
    return await this.userService.modifyUser(userId, modifyUserBody);
  }

  @Get('/dupCheck/nickname/:nickname')
  async dupCheckNickname(@Param('nickname') nickname: string) {
    return await this.userService.dupCheckNickname(nickname);
  }

  @Patch('/change/profileImage')
  async changeProfileImage(@Body() changeProfImgBody) {}

  @Patch('/certificate/email')
  async certificateEamil() {}

  @Patch('/certificate/phone')
  async certificatePhone() {}

  //큰일남. 사용할 수 있는 api가 없네 엄. 사진 받아서 수작업으로 검증해야하나?
  @Patch('/certificate/rank')
  async certificateDiveRank() {}
}
