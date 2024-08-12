import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthController } from '@/apis/auth/auth.controller';
import { AuthRepository } from '@/apis/auth/auth.repository';
import { AuthService } from '@/apis/auth/auth.service';
import { DiveShopModule } from '@/apis/diveShop/diveShop.module';
import { UserModule } from '@/apis/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => DiveShopModule)],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
