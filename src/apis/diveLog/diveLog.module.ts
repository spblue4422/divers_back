import { Module } from '@nestjs/common';
import { DiveLogController } from './diveLog.controller';
import { DiveLogService } from './diveLog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from './diveLog.repository';
import { UserModule } from '../user/user.module';
import { DiveLog, DiveLogDetail } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([DiveLog, DiveLogDetail]), UserModule],
  controllers: [DiveLogController],
  providers: [DiveLogService, DiveLogRepository, DiveLogDetailRepository],
  exports: [DiveLogService],
})
export class DiveLogModule {}
