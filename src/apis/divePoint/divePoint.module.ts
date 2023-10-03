import { Module } from '@nestjs/common';
import { DivePointController } from './divePoint.controller';
import { DivePointService } from './divePoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivePointRepostiory } from './divePoint.repository';
import { UserModule } from '../user/user.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  imports: [
    UserModule,
    RecommendationModule,
    TypeOrmModule.forFeature([DivePointRepostiory]),
  ],
  controllers: [DivePointController],
  providers: [DivePointService],
  exports: [DivePointService],
})
export class DivePointModule {}
