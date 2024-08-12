import { Module } from '@nestjs/common';

import { UserModule } from 'src/apis/user/user.module';

@Module({
  imports: [UserModule],
  providers: [],
  exports: [],
})
export class userAdminModule {}
