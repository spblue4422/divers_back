import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiveShopController } from '@/apis/diveShop/diveShop.controller';
import { DiveShopRepository } from '@/apis/diveShop/diveShop.repository';
import { DiveShopService } from '@/apis/diveShop/diveShop.service';
import { DiveShopCertApplyRepository } from '@/apis/diveShop/diveShopCertApply.repository';
import { RecommendationModule } from '@/apis/recommendation/recommendation.module';
import { DiveShop, DiveShopCertApply } from '@/entities/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiveShop, DiveShopCertApply]),
    RecommendationModule,
  ],
  controllers: [DiveShopController],
  providers: [DiveShopService, DiveShopRepository, DiveShopCertApplyRepository],
  exports: [DiveShopService],
})
export class DiveShopModule {}
