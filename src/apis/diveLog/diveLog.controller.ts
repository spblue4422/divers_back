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
import { DiveLogService } from './diveLog.service';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveLogResDto } from './dtos/diveLogRes.dto';
import { DiveLogInListResDto } from './dtos/diveLogInListRes.dto';
import { CreateDiveLogReqDto } from './dtos/createDiveLogReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { DiveLogDetailResDto } from './dtos/diveLogDetailRes.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/currentUser';
import { JwtAccessPayloadDto } from 'src/common/dtos/jwtPayload.dto';

@UseGuards(AuthGuard)
@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '내 다이브 로그 목록 조회',
  })
  @Get('/my/list')
  async getMyDiveLogList(
    @Query() pagination: PaginationReqDto,
    @CurrentUser() user: JwtAccessPayloadDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const { userId } = user;
    return this.diveLogService.getMyDiveLogList(userId, pagination);
  }

  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '유저 다이브 로그 목록 조회',
  })
  @Get('/user/:userId/list')
  async getUserDiveLogList(
    @Param('userId') userId: number,
    @Query() pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    return this.diveLogService.getUserDiveLogList(userId, pagination);
  }

  @ApiOkResponse({
    type: DiveLogResDto,
    description: '다이브 로그 조회',
  })
  @Get('/:logId')
  async getDiveLogById(
    @Param() logId: number,
    @CurrentUser() user: JwtAccessPayloadDto,
  ): Promise<DiveLogResDto> {
    const { userId } = user;

    return this.diveLogService.getDiveLog(logId, userId);
  }

  @ApiOkResponse({
    type: DiveLogDetailResDto,
    description: '상세 다이브 로그 조회',
  })
  @Get('/:logId/detail')
  async getDiveLogDetialById(
    @Param() logid: number,
    @CurrentUser() user: JwtAccessPayloadDto,
  ) {
    const { userId } = user;
  }

  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 생성' })
  @Post('/create')
  async createDiveLog(
    @Body() createDiveLogBody: CreateDiveLogReqDto,
    @CurrentUser() user: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { userId } = user;

    return this.diveLogService.createDiveLog(userId, createDiveLogBody);
  }

  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 수정' })
  @Patch('/:logId/modify')
  async modfiyDiveLog(
    @Param() logId: number,
    @Body() modifyDiveLogBody,
    @CurrentUser() user: JwtAccessPayloadDto,
  ) {
    const { userId } = user;

    return this.diveLogService.modifyDiveLog(logId, userId, modifyDiveLogBody);
  }

  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 삭제' })
  @Delete('/:logId/remove')
  async removeDiveLog(
    @Param() logId: number,
    @CurrentUser() user: JwtAccessPayloadDto,
  ) {
    const { userId } = user;

    return this.diveLogService.removeDiveLog(logId, userId);
  }

  @Patch('/:logId/changePublic')
  async changeIsPublic() {}
}
