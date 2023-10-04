import { Module } from '@nestjs/common';
import { RecommendationService } from './recommednation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from 'src/entities/Recommendation';
import { RecommendationRepository } from './recommendation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation])],
  providers: [RecommendationService, RecommendationRepository],
  exports: [RecommendationService],
})
export class RecommendationModule {}
