import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourRepository } from './tour.repository';
import { TourService } from './tour.service';
import { Tour } from 'src/entities';
import { DiveLogModule } from '../diveLog/diveLog.module';

@Module({
  imports: [DiveLogModule, TypeOrmModule.forFeature([Tour])],
  providers: [TourService, TourRepository],
  exports: [TourService],
})
export class TourModule {}
