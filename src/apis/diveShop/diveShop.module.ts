import { Module } from '@nestjs/common';
import { DiveShopController } from './diveShop.controller';
import { DiveShopService } from './diveShop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveShopRepository } from './diveShop.repository';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { DiveShopCertApplyRepository } from './diveShopCertApply.repository';
import { DiveShop, DiveShopCertApply } from 'src/entities';

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
