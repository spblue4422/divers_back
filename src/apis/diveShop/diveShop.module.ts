import { Module } from '@nestjs/common';
import { DiveShopController } from './diveShop.controller';
import { DiveShopService } from './diveShop.service';

@Module({
  controllers: [DiveShopController],
  providers: [DiveShopService],
  exports: [DiveShopService],
})
export class DiveShopModule {}
