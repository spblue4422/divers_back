import { Module } from '@nestjs/common';
import { DivePointController } from './divePoint.controller';
import { DivePointService } from './divePoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivePointRepostiory } from './divePoint.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DivePointRepostiory])],
  controllers: [DivePointController],
  providers: [DivePointService],
  exports: [DivePointService],
})
export class DivePointModule {}
