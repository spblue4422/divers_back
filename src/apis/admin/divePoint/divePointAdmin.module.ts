import { Module } from '@nestjs/common';
import { DivePointModule } from 'src/apis/divePoint/divePoint.module';
import { DivePointReviewModule } from 'src/apis/divePoint/review/divePointReview.module';

@Module({
  imports: [DivePointModule, DivePointReviewModule],
  providers: [],
  exports: [],
})
export class DivePointAdminModule {}
