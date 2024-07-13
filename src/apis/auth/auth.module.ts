import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { DiveShopModule } from '../diveShop/diveShop.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    UserModule,
    DiveShopModule,
    JwtModule.register({
      global: true,
      secret: 'spblue4422',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
