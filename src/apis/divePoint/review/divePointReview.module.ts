import { Module } from '@nestjs/common';
import { DivePointReviewController } from './divePointReview.controller';
import { DivePointReviewService } from './divePointReview.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivePointReviewRepository } from './divePointReview.repository';
import { UserModule } from 'src/apis/user/user.module';
import { DivePointModule } from '../divePoint.module';

@Module({
  imports: [
    UserModule,
    DivePointModule,
    TypeOrmModule.forFeature([DivePointReviewRepository]),
  ],
  controllers: [DivePointReviewController],
  providers: [DivePointReviewService],
  exports: [DivePointReviewService],
})
export class DivePointReviewModule {}
