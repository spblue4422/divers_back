import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DiveLogService } from './diveLog.service';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveLogResDto } from './dtos/diveLogRes.dto';
import { DiveLogInListResDto } from './dtos/diveLogInListRes.dto';
import { CreateDiveLogReqDto } from './dtos/createDiveLogReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { DiveLogDetailResDto } from './dtos/diveLogDetailRes.dto';

@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  @Get('/list')
  //이 api에 의미가 있나? 그냥 내 로그 리스트 뽑는 걸로 바꾸는게 낫지않을까
  async getDiveLogList(
    @Query() pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    return this.diveLogService.getDiveLogList(pagination);
  }

  @Get('/:logId')
  async getDiveLogById(
    @Param() logId: number,
    userId: number,
  ): Promise<DiveLogResDto> {
    return this.diveLogService.getDiveLog(logId, userId);
  }

  @Get('/:logId/detail')
  async getDiveLogDetialById(@Param() logid: number, userId: number) {}

  @Post('/create')
  async createDiveLog(
    @Body() createDiveLogBody: CreateDiveLogReqDto,
    userId: number,
  ): Promise<MsgResDto> {
    return this.diveLogService.createDiveLog(userId, createDiveLogBody);
  }

  @Patch('/:logId/modify')
  async modfiyDiveLog(
    @Param() logId: number,
    @Body() modifyDiveLogBody,
    userId: number,
  ) {
    return this.diveLogService.modifyDiveLog(logId, userId, modifyDiveLogBody);
  }

  @Delete('/:logId/remove')
  async removeDiveLog(@Param() logId: number, userId: number) {
    return this.diveLogService.removeDiveLog(logId, userId);
  }

  @Patch('/:logId/changePublic')
  async changeIsPublic() {}
}
