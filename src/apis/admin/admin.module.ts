import { Module } from '@nestjs/common';

import { DiveShopAdminModule } from '@/apis/admin/diveShop/diveShpoAdmin.module';
import { userAdminModule } from '@/apis/admin/user/userAdmin.module';

@Module({
  imports: [userAdminModule, DiveShopAdminModule],
  providers: [],
  exports: [],
})
export class AdminModule {}
