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
import { ApiOkResponse } from '@nestjs/swagger';

import { AuthGuard } from '@/apis/auth/guards/auth.guard';
import { RoleGuard } from '@/apis/auth/guards/role.guard';
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

@UseGuards(AuthGuard)
@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  @Get('/list')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '유저 다이브 로그 목록 조회',
  })
  async getUserDiveLogList(
    @Query('user') userHandle: string,
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
  @ApiOkResponse({
    type: DiveLogResDto,
    description: '다이브 로그 조회',
  })
  async getDiveLogById(
    @Param() logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<DiveLogResDto> {
    const { keyId: userId } = cur;

    return this.diveLogService.getDiveLog(logId, userId);
  }

  @Post('')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 생성' })
  async createDiveLog(
    @Body() createDiveLogBody: CreateDiveLogReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveLogService.createDiveLog(userId, createDiveLogBody);
  }

  @Patch('/:logId')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 수정' })
  async modfiyDiveLog(
    @Param() logId: number,
    @Body() modifyDiveLogBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;

    return this.diveLogService.modifyDiveLog(logId, userId, modifyDiveLogBody);
  }

  @Delete('/:logId')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 삭제' })
  async removeDiveLog(
    @Param() logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;

    return this.diveLogService.removeDiveLog(logId, userId);
  }

  @Patch('/:logId/changePublic')
  @Roles([Role.USER])
  async changeIsPublic() {}
}
