import { Module } from '@nestjs/common';

import { DiveLogModule } from '@/apis/diveLog/diveLog.module';
import { DivePointModule } from '@/apis/divePoint/divePoint.module';
import { DiveShopModule } from '@/apis/diveShop/diveShop.module';
import { SearchService } from '@/apis/search/search.service';
import { UserModule } from '@/apis/user/user.module';

@Module({
  imports: [DiveShopModule, DivePointModule, UserModule, DiveLogModule],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
