import { Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { TourService } from './tour.service';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post('/create')
  async createTour() {}

  @Patch('/modify')
  async modifyTour() {}

  @Delete('/remove/:tourId')
  async removeTour(@Param('tourId') tourId: number) {}
}
