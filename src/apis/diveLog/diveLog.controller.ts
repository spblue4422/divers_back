import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { DiveLogService } from '@/apis/diveLog/diveLog.service';
import { CreateDiveLogReqDto } from '@/apis/diveLog/dtos/createDiveLogReq.dto';
import { DiveLogInListResDto } from '@/apis/diveLog/dtos/diveLogInListRes.dto';
import { DiveLogResDto } from '@/apis/diveLog/dtos/diveLogRes.dto';
import { Current } from '@/common/decorators/current';
import { Roles } from '@/common/decorators/roles';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { Role } from '@/common/enums';

@ApiTags('DiveLog')
@ApiBearerAuth('accessToken')
@UseGuards(AuthRoleGuard)
@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  @Get('/list')
  @Roles([Role.USER])
  @ApiOperation({ description: '유저가 작성한 다이브 로그 목록 조회 API' })
  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '다이브 로그 목록',
  })
  async getUserDiveLogList(
    @Query('id') userHandle: string,
    @Query() paginationForm: PaginationReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const { handle } = cur;
    const { page, pagingCount } = paginationForm;

    return this.diveLogService.getDiveLogListByUserHandle(
      userHandle,
      page,
      pagingCount,
      handle == userHandle,
    );
  }

  @Get('/:logId')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이브 로그 상세 조회 API' })
  @ApiOkResponse({
    type: DiveLogResDto,
    description: '다이브 로그',
  })
  async getDiveLogById(
    @Param('logId') logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<DiveLogResDto> {
    const { keyId: userId } = cur;

    return this.diveLogService.getDiveLog(logId, userId);
  }

  @Post('')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이브 로그 작성 API' })
  @ApiOkResponse({ type: MsgResDto, description: '작성 성공' })
  async createDiveLog(
    @Body() createDiveLogBody: CreateDiveLogReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveLogService.createDiveLog(userId, createDiveLogBody);
  }

  @Patch('/:logId')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이브 로그 수정 API' })
  @ApiOkResponse({ type: MsgResDto, description: '수정 성공' })
  async modfiyDiveLog(
    @Param('logId') logId: number,
    @Body() modifyDiveLogBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;

    return this.diveLogService.modifyDiveLog(logId, userId, modifyDiveLogBody);
  }

  @Delete('/:logId')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이브 로그 삭제 API' })
  @ApiOkResponse({ type: MsgResDto, description: '삭제 성공' })
  async removeDiveLog(
    @Param('logId') logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;

    return this.diveLogService.removeDiveLog(logId, userId);
  }

  @Patch('/:logId/:state')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이브 로그 공개 여부 설정 API' })
  @ApiOkResponse({ type: MsgResDto, description: '설정 성공' })
  async changeIsPublic(
    @Param('logId') logId: number,
    @Param('state') state: string, // 'public' || 'private'
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveLogService.changeIsPublic(logId, userId, state);
  }
}
