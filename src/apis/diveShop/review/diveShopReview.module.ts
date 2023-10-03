import { Module } from '@nestjs/common';
import { DiveShopReviewController } from './diveShopReview.controller';
import { DiveShopReviewService } from './diveShopReview.service';
import { UserModule } from 'src/apis/user/user.module';
import { DiveShopModule } from '../diveShop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveShopReviewRepository } from './diveShopReview.repository';

@Module({
  imports: [
    UserModule,
    DiveShopModule,
    TypeOrmModule.forFeature([DiveShopReviewRepository]),
  ],
  controllers: [DiveShopReviewController],
  providers: [DiveShopReviewService],
  exports: [DiveShopReviewService],
})
export class DiveShopReviewModule {}
