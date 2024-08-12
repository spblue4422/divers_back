import { Module } from '@nestjs/common';

import { DivePointModule } from '@/apis/divePoint/divePoint.module';
import { DivePointReviewModule } from '@/apis/divePoint/review/divePointReview.module';

@Module({
  imports: [DivePointModule, DivePointReviewModule],
  providers: [],
  exports: [],
})
export class DivePointAdminModule {}
