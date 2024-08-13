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
  @Get('/myProfile')
  async getMyProfile(
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MyProfileResDto> {
    const { handle } = cur;

    return this.userService
      .getUserByHandle(handle)
      .then((data) => MyProfileResDto.makeRes(data));
  }

  // 롤가드 - 유저만
  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 수정',
  })
  @UseGuards(AuthGuard)
  @Patch('/change/profile')
  async changeMyProfile(
    @Body() changeUserProfileBody: ChangeUserProfileReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { handle } = cur;

    return this.userService.changeUser(handle, changeUserProfileBody);
  }

  @ApiOkResponse({
    type: UserProfileResDto,
    description: '유저 프로필 확인',
  })
  @UseGuards(AuthGuard)
  @Get('/profile')
  async getUserProfile(
    @Query('handle') handle: string,
  ): Promise<UserProfileResDto> {
    return this.userService
      .getUserByHandle(handle)
      .then((data) => UserProfileResDto.makeRes(data));
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '프로필 이미지 변경',
  })
  @UseGuards(AuthGuard)
  @Patch('/profileImage')
  async changeMyProfileImage(@Body() changeProfImgBody) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '닉네임 중복 체크',
  })
  @Get('/checkDuplicate/nickname')
  async checkNicknameDuplicate(
    @Query('name') nickname: string,
  ): Promise<MsgResDto> {
    return this.userService.checkNicknameDuplicate(nickname);
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '이메일 인증',
  })
  @Patch('/certificate/email')
  async certificateEmail(
    @Body() cfEmailBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '휴대폰 인증',
  })
  @Patch('/certificate/phone')
  async certificatePhone(
    @Body() cfPhoneBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {}

  // 차후 개발 feature로 빼지뭐 ㅋㅋ
  @Patch('/certificate/rank')
  async certificateDiveRank(@Current() cur: JwtAccessPayloadDto) {}
}
