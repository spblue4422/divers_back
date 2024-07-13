import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { DiveShopModule } from '../diveShop/diveShop.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [UserModule, DiveShopModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
