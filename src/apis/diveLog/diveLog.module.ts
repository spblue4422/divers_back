import { Module } from '@nestjs/common';
import { DiveLogController } from './diveLog.controller';
import { DiveLogService } from './diveLog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiveLogRepository } from './diveLog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiveLogRepository])],
  controllers: [DiveLogController],
  providers: [DiveLogService],
  exports: [DiveLogService],
})
export class DiveLogModule {}
