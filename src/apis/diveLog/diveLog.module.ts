import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiveLogController } from '@/apis/diveLog/diveLog.controller';
import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from '@/apis/diveLog/diveLog.repository';
import { DiveLogService } from '@/apis/diveLog/diveLog.service';
import { UserModule } from '@/apis/user/user.module';
import { DiveLog, DiveLogDetail } from '@/entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([DiveLog, DiveLogDetail]), UserModule],
  controllers: [DiveLogController],
  providers: [DiveLogService, DiveLogRepository, DiveLogDetailRepository],
  exports: [DiveLogService],
})
export class DiveLogModule {}
