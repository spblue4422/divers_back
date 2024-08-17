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

import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { ModifyUserProfileReqDto } from '@/apis/user/dtos/modifyUserProfileReq.dto';
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

  @UseGuards(AuthRoleGuard)
  @Get('/profile')
  @Roles([Role.USER])
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
      .getUserByHandle(userHandle)
      .then((data) =>
        handle == userHandle
          ? MyProfileResDto.makeRes(data)
          : UserProfileResDto.makeRes(data),
      );
  }

  @UseGuards(AuthRoleGuard)
  @Patch('/profile')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: MsgResDto,
    description: '유저 프로필 정보 변경',
  })
  async modifyUserProfile(
    @Body() modfiyUserProfileBody: ModifyUserProfileReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { handle } = cur;

    return this.userService.modifyUser(handle, modfiyUserProfileBody);
  }

  @UseGuards(AuthRoleGuard)
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

  @UseGuards(AuthRoleGuard)
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

  @UseGuards(AuthRoleGuard)
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
  @UseGuards(AuthRoleGuard)
  @Patch('/certificate/rank')
  @Roles([Role.USER])
  async certificateDiveRank(@Current() cur: JwtAccessPayloadDto) {}
}
