import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationRepository } from '@/apis/recommendation/recommendation.repository';
import { RecommendationService } from '@/apis/recommendation/recommendation.service';
import { Recommendation } from '@/entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation])],
  providers: [RecommendationService, RecommendationRepository],
  exports: [RecommendationService],
})
export class RecommendationModule {}
