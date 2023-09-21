import { Module } from '@nestjs/common';
import { DiveShopModule } from '../diveShop/diveShop.module';
import { DivePointModule } from '../divePoint/divePoint.module';
import { UserModule } from '../user/user.module';
import { DiveLogModule } from '../diveLog/diveLog.module';

@Module({
  imports: [DiveShopModule, DivePointModule, UserModule, DiveLogModule],
})
export class SearchModule {}
