import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { DiveLogService } from '@/apis/diveLog/diveLog.service';
import { TourService } from '@/apis/tour/tour.service';

@Controller('tour')
export class TourController {
  constructor(
    private readonly tourService: TourService,
    private readonly diveLogService: DiveLogService,
  ) {}

  // 전반적으로 여기 api를 건드릴 때는 isPublic을 고려해가면서 짜야할 것 같음.
  @Get('/list')
  async getTourList() {
    return this.tourService.getTourList(1);
  }

  @Get('/:tourId')
  async getTourById() {}

  @Post('/create')
  async createTour() {}

  @Patch('/modify')
  async modifyTour() {}

  @Delete('/remove/:tourId')
  async removeTour(@Param('tourId') tourId: number) {}
}
