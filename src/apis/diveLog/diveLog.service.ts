import { Injectable } from '@nestjs/common';
import { DiveLogRepository } from './diveLog.repository';
import { DiveLog } from 'src/entities/DiveLog';
import { ListAndCountResDto } from 'src/common/dtos/listtAndCountRes.dto';

@Injectable()
export class DiveLogService {
  constructor(private readonly diveLogRepository: DiveLogRepository) {}

  async getDiveLogList(): Promise<ListAndCountResDto<DiveLog>> {
    return this.diveLogRepository
      .findAndCountBy({ deletedAt: null })
      .then(([data, count]) => ({ dataList: data, totalCount: count }));
  }

  async getOneDiveShop(logId: bigint) {
    return this.diveLogRepository.findOneByOrFail({
      id: logId,
      deletedAt: null,
    });
  }
}
