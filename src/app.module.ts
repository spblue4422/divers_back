import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '@/apis/auth/auth.module';
import { DiveLogModule } from '@/apis/diveLog/diveLog.module';
import { DivePointModule } from '@/apis/divePoint/divePoint.module';
import { DivePointReviewModule } from '@/apis/divePoint/review/divePointReview.module';
import { DiveShopModule } from '@/apis/diveShop/diveShop.module';
import { DiveShopReviewModule } from '@/apis/diveShop/review/diveShopReview.module';
import { RecommendationModule } from '@/apis/recommendation/recommendation.module';
import { UserModule } from '@/apis/user/user.module';
import { AllExceptionFilter } from '@/common/utils/errorHandler';
import { DiversTypeOrmModule } from '@/config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    JwtModule.register({
      // auth module에서 빼왔는데 혹시 이상하면 다시 넘기자
      global: true,
      secret: 'spblue4422',
      signOptions: { expiresIn: '3600s' },
    }),
    AuthModule,
    UserModule,
    DiveShopModule,
    DiveShopReviewModule,
    DivePointModule,
    DivePointReviewModule,
    DiveLogModule,
    RecommendationModule,
    DiversTypeOrmModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
