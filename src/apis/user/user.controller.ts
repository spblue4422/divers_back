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
import { Roles } from '@/common/decorators/roles';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { Role } from '@/common/enums';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 롤가드 - 유저만
  // @ApiOkResponse({
  //   type: MyProfileResDto,
  //   description: '자신 프로필 확인',
  // })
  // @UseGuards(AuthGuard)
  // @Get('/myProfile')
  // async getMyProfile(
  //   @Current() cur: JwtAccessPayloadDto,
  // ): Promise<MyProfileResDto> {
  //   const { handle } = cur;

  //   return this.userService
  //     .getUserByHandle(handle)
  //     .then((data) => MyProfileResDto.makeRes(data));
  // }

  @UseGuards(AuthGuard)
  @Get('/profile')
  @ApiOkResponse({
    type: MyProfileResDto,
    description: '본인/다른 유저 프로필 확인',
  })
  async getUserProfile(
    @Query('user') userHandle: string,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<UserProfileResDto | MyProfileResDto> {
    const { handle } = cur;

    return this.userService
      .getUserByHandle(handle)
      .then((data) =>
        handle == userHandle
          ? MyProfileResDto.makeRes(data)
          : UserProfileResDto.makeRes(data),
      );
  }

  @UseGuards(AuthGuard)
  @Patch('/profile')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 정보 변경',
  })
  async changeMyProfile(
    @Body() changeUserProfileBody: ChangeUserProfileReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { handle } = cur;

    return this.userService.changeUser(handle, changeUserProfileBody);
  }

  @UseGuards(AuthGuard)
  @Patch('/profileImage')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: MsgResDto,
    description: '프로필 이미지 변경',
  })
  async changeMyProfileImage(
    @Body() changeProfImgBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {}

  @Get('/checkDuplicate/nickname')
  @ApiOkResponse({
    type: MsgResDto,
    description: '닉네임 중복 체크',
  })
  async checkNicknameDuplicate(
    @Query('name') nickname: string,
  ): Promise<MsgResDto> {
    return this.userService.checkNicknameDuplicate(nickname);
  }

  @UseGuards(AuthGuard)
  @Patch('/certificate/email')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: MsgResDto,
    description: '이메일 인증',
  })
  async certificateEmail(
    @Body() cfEmailBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {}

  @UseGuards(AuthGuard)
  @Patch('/certificate/phone')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: MsgResDto,
    description: '휴대폰 인증',
  })
  async certificatePhone(
    @Body() cfPhoneBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {}

  // 차후 개발 feature로 빼지뭐 ㅋㅋ
  @UseGuards(AuthGuard)
  @Patch('/certificate/rank')
  @Roles([Role.USER])
  async certificateDiveRank(@Current() cur: JwtAccessPayloadDto) {}
}
