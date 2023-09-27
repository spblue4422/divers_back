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
    @Param() logId: bigint,
    userId: number,
  ): Promise<DiveLogResDto> {
    return this.diveLogService.getOneDiveLog(logId, userId);
  }

  @Post('/create')
  async createDiveLog(@Body() createDiveLogBody) {}

  @Patch('/modify')
  async modfiyDiveLog(@Body() modifyDiveLogBody) {}

  @Delete('/remove/:logId')
  async removeDiveLog(@Param() logId: number) {}

  @Patch('/change/isPublic')
  async changeIsPublic() {}
}
