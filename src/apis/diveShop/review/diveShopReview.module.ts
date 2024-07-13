import { Module } from '@nestjs/common';
import { DiveShopReviewController } from './diveShopReview.controller';
import { DiveShopReviewService } from './diveShopReview.service';
import { UserModule } from 'src/apis/user/user.module';
import { DiveShopModule } from '../diveShop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveShopReviewRepository } from './diveShopReview.repository';
import { DiveShopReview } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiveShopReview]),
    UserModule,
    DiveShopModule,
  ],
  controllers: [DiveShopReviewController],
  providers: [DiveShopReviewService, DiveShopReviewRepository],
  exports: [DiveShopReviewService],
})
export class DiveShopReviewModule {}
