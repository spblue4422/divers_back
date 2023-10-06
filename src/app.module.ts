import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiversTypeOrmModule } from './config/database';
import { UserModule } from './apis/user/user.module';
import { DiveShopModule } from './apis/diveShop/diveShop.module';
import { DivePointModule } from './apis/divePoint/divePoint.module';
import { DiveLogModule } from './apis/diveLog/diveLog.module';
import { RecommendationModule } from './apis/recommendation/recommendation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    UserModule,
    DiveShopModule,
    DivePointModule,
    DiveLogModule,
    RecommendationModule,
    DiversTypeOrmModule,
  ],
})
export class AppModule {}
