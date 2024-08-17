import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiveShopModule } from '@/apis/diveShop/diveShop.module';
import { DiveShopReviewController } from '@/apis/diveShop/review/diveShopReview.controller';
import { DiveShopReviewRepository } from '@/apis/diveShop/review/diveShopReview.repository';
import { DiveShopReviewService } from '@/apis/diveShop/review/diveShopReview.service';
import { RecommendationModule } from '@/apis/recommendation/recommendation.module';
import { DiveShopReview } from '@/entities/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiveShopReview]),
    DiveShopModule,
    RecommendationModule,
  ],
  controllers: [DiveShopReviewController],
  providers: [DiveShopReviewService, DiveShopReviewRepository],
  exports: [DiveShopReviewService],
})
export class DiveShopReviewModule {}
