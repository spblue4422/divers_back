import { Module } from '@nestjs/common';
import { DiveLogController } from './diveLog.controller';
import { DiveLogService } from './diveLog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from './diveLog.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([DiveLogRepository])],
  controllers: [DiveLogController],
  providers: [DiveLogService, DiveLogRepository, DiveLogDetailRepository],
  exports: [DiveLogService],
})
export class DiveLogModule {}
