import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { ChangeUserProfileReqDto } from './dtos/changeUserProfileReq.dto';
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
  @Get('/:userId/profile')
  async getUserProfile(
    @Param('userId') userId: number,
  ): Promise<UserProfileResDto> {
    return this.userService.getUserProfileById(userId);
  }

  @ApiOkResponse({
    type: MyProfileResDto,
    description: '자신 프로필 확인',
  })
  @Get('/my/profile')
  async getMyProfile(
    @Param('userId') userId: number,
  ): Promise<MyProfileResDto> {
    return this.userService.getMyProfile(userId);
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 수정',
  })
  @Patch('/:userId/modify')
  async changeMyProfile(
    @Param('userId') userId: number,
    @Body() changeUserProfileBody: ChangeUserProfileReqDto,
  ): Promise<MsgResDto> {
    return await this.userService.changeUser(userId, changeUserProfileBody);
  }

  @Patch('/:userId/change/profileImage')
  @ApiOkResponse({
    type: MsgResDto,
    description: '프로필 이미지 변경',
  })
  async changeMyProfileImage(@Body() changeProfImgBody) {}

  @Patch('/:userId/certificate/email')
  @ApiOkResponse({
    type: MsgResDto,
    description: '이메일 인증',
  })
  async certificateEamil(@Body() cfEmailBody) {}

  @Patch('/:userId/certificate/phone')
  @ApiOkResponse({})
  async certificatePhone(@Body() cfPhoneBody) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '닉네임 중복 체크',
  })
  @Get('/dupCheck/nickname/:nickname')
  async dupCheckNickname(@Param('nickname') nickname: string) {
    return await this.userService.dupCheckNickname(nickname);
  }

  //큰일남. 사용할 수 있는 api가 없네 엄. 사진 받아서 수작업으로 검증해야하나?
  // 차후 개발 feature로 빼지뭐 ㅋㅋ
  @Patch('/certificate/rank')
  async certificateDiveRank() {}
}
