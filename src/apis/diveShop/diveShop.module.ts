import { Module } from '@nestjs/common';
import { DiveShopController } from './diveShop.controller';
import { DiveShopService } from './diveShop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DiveShopRepository } from './diveShop.repository';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { DiveShopCertApplyRepository } from './diveShopCertApply.repository';
import DiveShop from 'src/entities/DiveShop';
import DiveShopCertApply from 'src/entities/DiveShopCertApply';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiveShop, DiveShopCertApply]),
    UserModule,
    RecommendationModule,
  ],
  controllers: [DiveShopController],
  providers: [DiveShopService, DiveShopRepository, DiveShopCertApplyRepository],
  exports: [DiveShopService],
})
export class DiveShopModule {}
