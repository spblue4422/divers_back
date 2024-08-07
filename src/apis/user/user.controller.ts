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
import { JwtAccessPayloadDto } from 'src/common/dtos/jwtPayload.dto';
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
    @CurrentUser() user: JwtAccessPayloadDto,
  ): Promise<MyProfileResDto> {
    const { userId } = user;

    return this.userService.getMyProfile(userId);
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 수정',
  })
  @UseGuards(AuthGuard)
  @Patch('/change/profile')
  async changeMyProfile(
    @CurrentUser() user: JwtAccessPayloadDto,
    @Body() changeUserProfileBody: ChangeUserProfileReqDto,
  ): Promise<MsgResDto> {
    const { userId } = user;

    return await this.userService.changeUser(userId, changeUserProfileBody);
  }

  @ApiOkResponse({
    type: UserProfileResDto,
    description: '유저 프로필 확인',
  })
  @UseGuards(AuthGuard)
  @Get('/:userId/profile')
  async getUserProfile(
    @Param('userId') userId: number,
  ): Promise<UserProfileResDto> {
    return this.userService.getUserProfileById(userId);
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '프로필 이미지 변경',
  })
  @UseGuards(AuthGuard)
  @Patch('/:userId/change/profileImage')
  async changeMyProfileImage(@Body() changeProfImgBody) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '이메일 인증',
  })
  @Patch('/:userId/certificate/email')
  async certificateEmail(@Body() cfEmailBody) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '휴대폰 인증',
  })
  @Patch('/:userId/certificate/phone')
  async certificatePhone(@Body() cfPhoneBody) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '닉네임 중복 체크',
  })
  @Get('/checkDuplicate/nickname')
  async checkNicknameDuplicate(@Query('name') nickname: string) {
    return this.userService.checkNicknameDuplicate(nickname);
  }

  // 차후 개발 feature로 빼지뭐 ㅋㅋ
  @Patch('/:userId/certificate/rank')
  async certificateDiveRank() {}
}
