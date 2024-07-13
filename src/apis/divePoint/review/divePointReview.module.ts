import { Module } from '@nestjs/common';
import { DivePointReviewController } from './divePointReview.controller';
import { DivePointReviewService } from './divePointReview.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivePointReviewRepository } from './divePointReview.repository';
import { UserModule } from 'src/apis/user/user.module';
import { DivePointModule } from '../divePoint.module';
import DivePointReview from 'src/entities/DivePointReview';

@Module({
  imports: [
    TypeOrmModule.forFeature([DivePointReview]),
    UserModule,
    DivePointModule,
  ],
  controllers: [DivePointReviewController],
  providers: [DivePointReviewService, DivePointReviewRepository],
  exports: [DivePointReviewService],
})
export class DivePointReviewModule {}
