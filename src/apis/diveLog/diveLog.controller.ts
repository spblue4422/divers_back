import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DiveLogService } from './diveLog.service';

@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  @Get('/list')
  async getDiveLogList() {}

  @Get('/:logId')
  async getDiveLogById(@Param() logId: bigint) {}

  @Post('/create')
  async createDiveLog(@Body() createDiveLogBody) {}

  @Patch('/modify')
  async modfiyDiveLog(@Body() modifyDiveLogBody) {}

  @Delete('/remove/:logId')
  async removeDiveLog(@Param() logId: number) {}

  @Patch('/change/isPublic')
  async changeIsPublic() {}
}
