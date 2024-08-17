import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/apis/auth/auth.module';
import { DivePointController } from '@/apis/divePoint/divePoint.controller';
import { DivePointRepostiory } from '@/apis/divePoint/divePoint.repository';
import { DivePointService } from '@/apis/divePoint/divePoint.service';
import { RecommendationModule } from '@/apis/recommendation/recommendation.module';
import { DivePoint } from '@/entities/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([DivePoint]),
    RecommendationModule,
    AuthModule,
  ],
  controllers: [DivePointController],
  providers: [DivePointService, DivePointRepostiory],
  exports: [DivePointService],
})
export class DivePointModule {}
