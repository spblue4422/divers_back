import { Module } from '@nestjs/common';
import { RecommendationService } from './recommednation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationRepository } from './recommendation.repository';
import { Recommendation } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation])],
  providers: [RecommendationService, RecommendationRepository],
  exports: [RecommendationService],
})
export class RecommendationModule {}
