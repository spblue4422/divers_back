import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { DivePointService } from './divePoint.service';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';

@Controller('point')
export class DivePointController {
  constructor(private readonly divePointService: DivePointService) {}

  @Get('/list')
  async getDivePointList(@Query() paginationForm: PaginationReqDto) {
    const { page, count } = paginationForm;

    return this.divePointService.getDivePointList(page, count);
  }

  @Get('/:pointId')
  async getDivePoint(@Param() pointId: number) {
    return this.divePointService
  }

  @Patch('/recomment/:pointId')
  async recommentPoint(@Param() pointId: number) {}
}
