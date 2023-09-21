import { Controller, Get, Param, Patch } from '@nestjs/common';
import { DivePointService } from './divePoint.service';

@Controller('point')
export class DivePointController {
  constructor(private readonly divePointService: DivePointService) {}

  @Get('/list')
  async getDivePointList() {}

  @Get('/:pointId')
  async getDivePoint(@Param() pointId: number) {}

  @Patch('/recomment/:pointId')
  async recommentPoint(@Param() pointId: number) {}
}
