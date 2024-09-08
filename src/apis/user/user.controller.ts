import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthRoleGuard)
  @Roles([Role.USER])
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '본인/다른 유저 프로필 확인 API' })
  @ApiOkResponse({
    type: MyProfileResDto,
    description: '본인/다른 유저 프로필 정보',
  })
  async getUserProfile(
    @Query('user') userHandle: string,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<UserProfileResDto | MyProfileResDto> {
    const { handle } = cur;

    return this.userService
      .getUser(userHandle)
      .then((data) =>
        handle == userHandle
          ? MyProfileResDto.makeRes(data)
          : UserProfileResDto.makeRes(data),
      );
  }

  @Patch('/profile')
  @UseGuards(AuthRoleGuard)
  @Roles([Role.USER])
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '유저 프로필 정보 변경 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '변경 성공',
  })
  async modifyUserProfile(
    @Body() modfiyUserProfileBody: ModifyUserProfileReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.userService.modifyUser(userId, modfiyUserProfileBody);
  }

  @Patch('/profileImage')
  @UseGuards(AuthRoleGuard)
  @Roles([Role.USER])
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '유저 프로필 이미지 변경 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '변경 성공',
  })
  async changeMyProfileImage(
    @UploadedFile('profImg') image: Express.Multer.File,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;

    return this.userService.modifyProfileImage(userId, image);
  }

  @Get('/checkDuplicate/nickname')
  @ApiOperation({ description: '닉네임 중복 체크 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '검사 통과',
  })
  async checkNicknameDuplicate(
    @Query('name') nickname: string,
  ): Promise<MsgResDto> {
    return this.userService.checkNicknameDuplicate(nickname);
  }

  @Patch('/certificate/email')
  @UseGuards(AuthRoleGuard)
  @Roles([Role.USER])
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '이메일 인증 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '인증 성공',
  })
  async certificateEmail(
    @Body() cfEmailBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {}

  @Patch('/certificate/phone')
  @UseGuards(AuthRoleGuard)
  @Roles([Role.USER])
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '휴대폰 인증 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '인증 성공',
  })
  async certificatePhone(
    @Body() cfPhoneBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {}

  // 차후 개발 feature로 빼지뭐 ㅋㅋ
  @Patch('/certificate/rank')
  @UseGuards(AuthRoleGuard)
  @Roles([Role.USER])
  @ApiBearerAuth('accessToken')
  @ApiOperation({ description: '자격증 인증 API' })
  @ApiOkResponse({ type: MsgResDto, description: '인증 성공' })
  async certificateDiveRank(@Current() cur: JwtAccessPayloadDto) {}
}
