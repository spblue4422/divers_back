import { Module } from '@nestjs/common';
import { RecommendationService } from './recommednation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from 'src/entities/Recommendation';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation])],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}
