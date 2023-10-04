import { Module } from '@nestjs/common';
import { DiveShopModule } from '../diveShop/diveShop.module';
import { DivePointModule } from '../divePoint/divePoint.module';
import { UserModule } from '../user/user.module';
import { DiveLogModule } from '../diveLog/diveLog.module';
import { SearchService } from './search.service';

@Module({
  imports: [DiveShopModule, DivePointModule, UserModule, DiveLogModule],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
