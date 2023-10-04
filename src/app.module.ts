import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DiversTypeOrmModule } from './common/config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    // 이거 왜 안됨?? 나중에 확인해보자
    // DiversTypeOrmModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'divers',
      username: 'divers_admin',
      password: 'divers_password',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: 'Asia/Seoul',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
