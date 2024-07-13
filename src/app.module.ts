import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiversTypeOrmModule } from './config/database';
import { UserModule } from './apis/user/user.module';
import { DiveShopModule } from './apis/diveShop/diveShop.module';
import { DivePointModule } from './apis/divePoint/divePoint.module';
import { DiveLogModule } from './apis/diveLog/diveLog.module';
import { AuthModule } from './apis/auth/auth.module';
import { DiveShopReviewModule } from './apis/diveShop/review/diveShopReview.module';
import { DivePointReviewModule } from './apis/divePoint/review/divePointReview.module';
import { JwtModule } from '@nestjs/jwt';
import { RecommendationModule } from './apis/recommendation/recommendation.module';

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
})
export class AppModule {}
