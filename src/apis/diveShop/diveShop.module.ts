import { Module } from '@nestjs/common';
import { DiveShopController } from './diveShop.controller';
import { DiveShopService } from './diveShop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { DiveShopRepository } from './diveShop.repository';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  imports: [
    UserModule,
    RecommendationModule,
    TypeOrmModule.forFeature([DiveShopRepository]),
  ],
  controllers: [DiveShopController],
  providers: [DiveShopService],
  exports: [DiveShopService],
})
export class DiveShopModule {}
