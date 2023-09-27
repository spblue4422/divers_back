import { Injectable } from '@nestjs/common';
import { DiveLogRepository } from './diveLog.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { throwErr } from 'src/common/utils/errorHandler';
import { DiveLogResDto } from './dtos/diveLogRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { DiveLogInListResDto } from './dtos/diveLogInListRes.dto';
@Injectable()
export class DiveLogService {
  constructor(private readonly diveLogRepository: DiveLogRepository) {}

  async getDiveLogList(
    pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const { page, pagingCount } = pagination;

    //updatedAt과 createdAt을 같이 비교하는 방법? - 필요가 있나...? create 됬을 때, update를 같이 넣어주면 될듯
    return this.diveLogRepository.getDiveLogListWithCount(
      page,
      pagingCount,
      false,
      { isPublic: true, isBlocked: false },
      { createdAt: 'DESC' },
    );
  }

  // search에서 사용할 수 있을듯
  async getDiveLogListByUserId(
    userId: number,
    requestUserId: number,
    pagination: PaginationReqDto,
  ) {
    const { page, pagingCount } = pagination;

    // 본인 로그 리스트 확인 -> 자신 userId를 서비스 단에서 토큰에서 뽑는 방법이 있을까?
    if (userId === requestUserId) {
      return this.diveLogRepository.getDiveLogListWithCount(
        page,
        pagingCount,
        true,
        { userId },
        { createdAt: 'DESC' },
      );
    } else {
      return this.diveLogRepository.getDiveLogListWithCount(
        page,
        pagingCount,
        false,
        { userId, isPublic: true, isBlocked: false },
        { createdAt: 'DESC' },
      );
    }
  }

  async getOneDiveLog(
    logId: bigint,
    requestUserId: number,
  ): Promise<DiveLogResDto> {
    const diveLog = await this.diveLogRepository
      .findOneOrFail({
        where: {
          id: logId,
        },
      })
      .catch(() => throwErr('NO_DIVELOG'));

    if (diveLog.userId == requestUserId)
      return DiveLogResDto.makeRes(diveLog, true);
    else if (diveLog.isPublic) {
      if (diveLog.isBlocked) throwErr('BLOCKED_DIVELOG');
      else return DiveLogResDto.makeRes(diveLog, false);
    } else throwErr('NO_ACCESS_PRIVATE_DIVELOG');
  }
}
