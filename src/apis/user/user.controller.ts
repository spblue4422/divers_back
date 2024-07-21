import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { ChangeUserProfileReqDto } from './dtos/changeUserProfileReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { MyProfileResDto } from './dtos/myProfileRes.dto';
import { CurrentUser } from 'src/common/decorators/currentUser';
import { JwtPayloadDto } from 'src/common/dtos/jwtPayload.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: MyProfileResDto,
    description: '자신 프로필 확인',
  })
  @UseGuards(AuthGuard)
  @Get('/my/profile')
  async getMyProfile(
    @CurrentUser() user: JwtPayloadDto,
  ): Promise<MyProfileResDto> {
    const { authId } = user;

    return this.userService.getMyProfile(authId);
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 수정',
  })
  @Patch('/change/profile')
  async changeMyProfile(
    @CurrentUser() user: JwtPayloadDto,
    @Body() changeUserProfileBody: ChangeUserProfileReqDto,
  ): Promise<MsgResDto> {
    const { authId } = user;

    return await this.userService.changeUser(authId, changeUserProfileBody);
  }

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
  async certificateEmail(@Body() cfEmailBody) {}

  @Patch('/:userId/certificate/phone')
  @ApiOkResponse({})
  async certificatePhone(@Body() cfPhoneBody) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '닉네임 중복 체크',
  })
  @Get('/checkDuplicate/nickname')
  async checkNicknameDuplicate(@Query('name') nickname: string) {
    return await this.userService.checkNicknameDuplicate(nickname);
  }

  //큰일남. 사용할 수 있는 api가 없네 엄. 사진 받아서 수작업으로 검증해야하나?
  // 차후 개발 feature로 빼지뭐 ㅋㅋ
  @Patch('/:userId/certificate/rank')
  async certificateDiveRank() {}
}
