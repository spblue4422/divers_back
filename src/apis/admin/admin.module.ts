import { Module } from '@nestjs/common';
import { userAdminModule } from './user/userAdmin.module';
import { DiveShopAdminModule } from './diveShop/diveShpoAdmin.module';

@Module({
  imports: [userAdminModule, DiveShopAdminModule],
  providers: [],
  exports: [],
})
export class AdminModule {}
