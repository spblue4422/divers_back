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
  ): Promise<MsgResDto> {
    return this.diveLogService.createDiveLog(createDiveLogBody);
  }

  @Patch('/:logId/modify')
  async modfiyDiveLog(@Param() logId: number, @Body() modifyDiveLogBody) {
    return this.diveLogService.modifyDiveLog(logId, modifyDiveLogBody);
  }

  @Delete('/:logId/remove')
  async removeDiveLog(@Param() logId: number) {
    return this.diveLogService.removeDiveLog(logId);
  }

  @Patch('/:logId/changePublic')
  async changeIsPublic() {}
}
