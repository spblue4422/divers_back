import { Module } from '@nestjs/common';

import { DiveShopModule } from '@/apis/diveShop/diveShop.module';
import { DiveShopReviewModule } from '@/apis/diveShop/review/diveShopReview.module';

@Module({
  imports: [DiveShopModule, DiveShopReviewModule],
  providers: [],
  exports: [],
})
export class DiveShopAdminModule {}
