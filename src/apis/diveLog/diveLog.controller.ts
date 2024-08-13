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
// roleguard를 authguard안에 집어넣어서 한번에 검증하는 로직을 만들어야 할 것 같음.
// @UseGuards(RoleGuard)
@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  @Get('/my/list')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '내 다이브 로그 목록 조회',
  })
  async getMyDiveLogList(
    @Query() paginationForm: PaginationReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const { keyId } = cur;

    return this.diveLogService.getUserDiveLogList(keyId, true, paginationForm);
  }

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
    const { handle, keyId } = cur;
    const { page, pagingCount } = paginationForm;

    return this.diveLogService.getUserDiveLogList(keyId, false, paginationForm);
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
    const { keyId } = cur;

    return this.diveLogService.getDiveLog(logId, keyId);
  }

  @Post('/create')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 생성' })
  async createDiveLog(
    @Body() createDiveLogBody: CreateDiveLogReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId } = cur;

    return this.diveLogService.createDiveLog(keyId, createDiveLogBody);
  }

  @Patch('/:logId/modify')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 수정' })
  async modfiyDiveLog(
    @Param() logId: number,
    @Body() modifyDiveLogBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId } = cur;

    return this.diveLogService.modifyDiveLog(logId, keyId, modifyDiveLogBody);
  }

  @Delete('/:logId/remove')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 삭제' })
  async removeDiveLog(
    @Param() logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId } = cur;

    return this.diveLogService.removeDiveLog(logId, keyId);
  }

  @Patch('/:logId/changePublic')
  @Roles([Role.USER])
  async changeIsPublic() {}
}
