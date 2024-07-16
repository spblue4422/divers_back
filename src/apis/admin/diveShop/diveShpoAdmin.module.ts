import { Module } from '@nestjs/common';
import { DiveShopModule } from 'src/apis/diveShop/diveShop.module';
import { DiveShopReviewModule } from 'src/apis/diveShop/review/diveShopReview.module';

@Module({
  imports: [DiveShopModule, DiveShopReviewModule],
  providers: [],
  exports: [],
})
export class DiveShopAdminModule {}
