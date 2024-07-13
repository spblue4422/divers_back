import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourRepository } from './tour.repository';
import { TourService } from './tour.service';
import { Tour } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  providers: [TourService, TourRepository],
  exports: [TourService],
})
export class TourModule {}
