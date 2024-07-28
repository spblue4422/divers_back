import { Module } from '@nestjs/common';
import { DivePointController } from './divePoint.controller';
import { DivePointService } from './divePoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivePointRepostiory } from './divePoint.repository';
import { UserModule } from '../user/user.module';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { DivePoint } from 'src/entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DivePoint]),
    UserModule,
    RecommendationModule,
    AuthModule,
  ],
  controllers: [DivePointController],
  providers: [DivePointService, DivePointRepostiory],
  exports: [DivePointService],
})
export class DivePointModule {}
