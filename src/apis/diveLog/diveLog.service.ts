import { Injectable } from '@nestjs/common';
import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from './diveLog.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { throwErr } from 'src/common/utils/errorHandler';
import { DiveLogResDto } from './dtos/diveLogRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { DiveLogInListResDto } from './dtos/diveLogInListRes.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { CreateDiveLogReqDto } from './dtos/createDiveLogReq.dto';
import { convertKeyToValue } from 'src/common/utils/enumConverter';
@Injectable()
export class DiveLogService {
  constructor(
    private readonly diveLogRepository: DiveLogRepository,
    private readonly diveLogDetailRepository: DiveLogDetailRepository,
  ) {}

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

  async createDiveLog(createDiveLogBody: CreateDiveLogReqDto) {
    const { weather, wave, current, visibility, equipment, type } =
      createDiveLogBody;

    //이거 좀 줄일 수 있지않을까?
    const weatherVal = await convertKeyToValue('W', weather.toString());
    const waveVal = await convertKeyToValue('DE', wave.toString());
    const currentVal = await convertKeyToValue('DE', current.toString());
    const visibilityVal = await convertKeyToValue('DE', visibility.toString());
    const equipmentValList = equipment.map((e) =>
      convertKeyToValue('E', e.toString()),
    );
    const typeValList = type.map((t) => convertKeyToValue('DT', t.toString()));

    //이거 잘 될지 모르겠음. 안되면 body에서 로그랑 디테일 분리하자
    const { identifiers } = await this.diveLogRepository.insert({
      ...createDiveLogBody,
    });
    await this.diveLogDetailRepository.insert({
      logId: identifiers[0].id,
      weather: weatherVal,
      wave: waveVal,
      current: currentVal,
      visibility: visibilityVal,
      equipment: equipmentValList,
      type: typeValList,
      ...createDiveLogBody,
    });

    return MsgResDto.success();
  }

  async modifyDiveLog(logId: bigint, modifyDiveLogBody) {
    return MsgResDto.success();
  }

  async removeDiveLog(logId: bigint) {
    await this.diveLogRepository
      .softRemove({ id: logId })
      .catch(() => throwErr('NO_DIVELOG'));

    return MsgResDto.success();
  }
}
