import { Module } from '@nestjs/common';
import { DiveLogController } from './diveLog.controller';
import { DiveLogService } from './diveLog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from './diveLog.repository';
import { UserModule } from '../user/user.module';
import { DiveLog } from 'src/entities/DiveLog';
import { DiveLogDetail } from 'src/entities/DiveLogDetail';

@Module({
  imports: [TypeOrmModule.forFeature([DiveLog, DiveLogDetail]), UserModule],
  controllers: [DiveLogController],
  providers: [DiveLogService, DiveLogRepository, DiveLogDetailRepository],
  exports: [DiveLogService],
})
export class DiveLogModule {}
