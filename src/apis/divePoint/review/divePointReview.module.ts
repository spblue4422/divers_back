import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DivePointModule } from '@/apis/divePoint/divePoint.module';
import { DivePointReviewController } from '@/apis/divePoint/review/divePointReview.controller';
import { DivePointReviewRepository } from '@/apis/divePoint/review/divePointReview.repository';
import { DivePointReviewService } from '@/apis/divePoint/review/divePointReview.service';
import { DivePointReview } from '@/entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([DivePointReview]), DivePointModule],
  controllers: [DivePointReviewController],
  providers: [DivePointReviewService, DivePointReviewRepository],
  exports: [DivePointReviewService],
})
export class DivePointReviewModule {}
