import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AuthGuard } from '@/apis/auth/guards/auth.guard';
import { ChangeUserProfileReqDto } from '@/apis/user/dtos/changeUserProfileReq.dto';
import { MyProfileResDto } from '@/apis/user/dtos/myProfileRes.dto';
import { UserProfileResDto } from '@/apis/user/dtos/userProfileRes.dto';
import { UserService } from '@/apis/user/user.service';
import { Current } from '@/common/decorators/current';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 롤가드 - 유저만
  @ApiOkResponse({
    type: MyProfileResDto,
    description: '자신 프로필 확인',
  })
  @UseGuards(AuthGuard)
  @Get('/my/profile')
  async getMyProfile(
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MyProfileResDto> {
    const { userId } = cur;

    return this.userService.getUserProfileById(
      userId,
      true,
    ) as unknown as MyProfileResDto;
  }

  // 롤가드 - 유저만
  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 수정',
  })
  @UseGuards(AuthGuard)
  @Patch('/change/profile')
  async changeMyProfile(
    @Current() cur: JwtAccessPayloadDto,
    @Body() changeUserProfileBody: ChangeUserProfileReqDto,
  ): Promise<MsgResDto> {
    const { userId } = cur;

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
    return this.userService.getUserProfileById(userId, false);
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
