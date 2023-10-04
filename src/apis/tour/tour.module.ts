import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourRepository } from './tour.repository';
import { TourService } from './tour.service';

@Module({
  imports: [TypeOrmModule.forFeature([TourRepository])],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
