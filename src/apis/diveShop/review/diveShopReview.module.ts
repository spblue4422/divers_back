import { Module } from '@nestjs/common';
import { DiveShopReviewController } from './diveShopReview.controller';
import { DiveShopReviewService } from './diveShopReview.service';

@Module({
  controllers: [DiveShopReviewController],
  providers: [DiveShopReviewService],
  exports: [DiveShopReviewService],
})
export class DiveShopReviewModule {}
