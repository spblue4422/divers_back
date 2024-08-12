import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiveLogModule } from '@/apis/diveLog/diveLog.module';
import { TourRepository } from '@/apis/tour/tour.repository';
import { TourService } from '@/apis/tour/tour.service';
import { Tour } from '@/entities/index';

@Module({
  imports: [DiveLogModule, TypeOrmModule.forFeature([Tour])],
  providers: [TourService, TourRepository],
  exports: [TourService],
})
export class TourModule {}
