import { Injectable } from '@nestjs/common';
import { DiveLogRepository } from './diveLog.repository';
import { DiveLog } from 'src/entities/DiveLog';
import { ListAndCountResDto } from 'src/common/dtos/listtAndCountRes.dto';
import { throwErr } from 'src/common/utils/errorHandler';
import { DiveLogResDto } from './dtos/diveLogRes.dto';
@Injectable()
export class DiveLogService {
  constructor(private readonly diveLogRepository: DiveLogRepository) {}

  async getDiveLogList(): Promise<ListAndCountResDto<DiveLog>> {
    return this.diveLogRepository
      .findAndCount({
        where: { isPublic: true, isBlocked: false },
        order: { createdAt: 'DESC' },
      }) //updatedAt과 createdAt을 같이 비교하는 방법?
      .then(([data, count]) => ({ dataList: data, totalCount: count }));
  }

  async getDiveLogListByUserId(userId: number, requestUserId: number) {
    if (userId === requestUserId) {
      return this.diveLogRepository
        .findAndCount({
          where: { userId },
          order: { createdAt: 'DESC' },
        })
        .then(([data, count]) => ({ dataList: data, totalCount: count }));
    } else {
      return this.diveLogRepository
        .findAndCount({
          where: { userId, isPublic: true, isBlocked: false },
          order: { createdAt: 'DESC' },
        })
        .then(([data, count]) => ({ dataList: data, totalCount: count }));
    }
  }

  async getOneDiveLog(
    logId: bigint,
    requestUserId: number,
  ): Promise<DiveLogResDto> {
    const diveLog = await this.diveLogRepository.findOne({
      where: {
        id: logId,
      },
    });

    if (!diveLog) throwErr('NO_DIVELOG');

    if (diveLog.isPublic || diveLog.userId === requestUserId)
      return DiveLogResDto.makeRes(diveLog);
    else throwErr('NO_ACCESS_PRIVATE_LOG');
  }
}
