import { Injectable } from '@nestjs/common';
import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from './diveLog.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveLogResDto } from './dtos/diveLogRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { DiveLogInListResDto } from './dtos/diveLogInListRes.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { CreateDiveLogReqDto } from './dtos/createDiveLogReq.dto';
import { convertKeyToValue } from 'src/common/utils/enumConverter';
import {
  DegreeExpression,
  DivingEquipment,
  DivingType,
  Weather,
} from 'src/common/enums';
import { ModifyDiveLogReqDto } from './dtos/modifyDiveLogReq.dto';
import { DiversException } from 'src/common/exceptions';

@Injectable()
export class DiveLogService {
  constructor(
    private readonly diveLogRepository: DiveLogRepository,
    private readonly diveLogDetailRepository: DiveLogDetailRepository,
  ) {}

  async getMyDiveLogList(userId: number, pagination: PaginationReqDto) {
    const { page, pagingCount } = pagination;

    return this.diveLogRepository.getDiveLogListWithCount(
      page,
      pagingCount,
      { userId },
      { createdAt: 'DESC' },
    );
  }

  async getUserDiveLogList(
    authId: number,
    pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const { page, pagingCount } = pagination;

    return this.diveLogRepository.getDiveLogListWithCount(
      page,
      pagingCount,
      { user: { authId }, isPublic: true, isBlocked: false },
      { createdAt: 'DESC' },
    );
  }

  async getDiveLog(logId: number, userId: number): Promise<DiveLogResDto> {
    const diveLog = await this.diveLogRepository
      .findOneOrFail({
        where: {
          id: logId,
        },
      })
      .catch(() => {
        throw new DiversException('NO_DIVELOG');
      });

    if (diveLog.userId == userId) return DiveLogResDto.makeRes(diveLog);
    else if (diveLog.isPublic) {
      if (diveLog.isBlocked) throw new DiversException('BLOCKED_DIVELOG');
      else return DiveLogResDto.makeRes(diveLog);
    } else throw new DiversException('NO_ACCESS_PRIVATE_DIVELOG');
  }

  async getDiveLogDetail(logId: number) {
    const diveLogDetail = await this.diveLogDetailRepository
      .findOneOrFail({
        where: {
          logId,
        },
      })
      .catch(() => {
        throw new DiversException('NO_DIVELOG');
      });
    // 들고 올 때, value -> enum 다 해줘야 함.
    // return DiveLogDetailResDto.
  }

  async convertKeyToValueForLog(keyObj: CreateDiveLogReqDto) {
    const { weather, wave, current, visibility, equipment, type } = keyObj;

    const weatherVal = await convertKeyToValue(Weather, weather.toString());
    const waveVal = await convertKeyToValue(DegreeExpression, wave.toString());
    const currentVal = await convertKeyToValue(
      DegreeExpression,
      current.toString(),
    );
    const visibilityVal = await convertKeyToValue(
      DegreeExpression,
      visibility.toString(),
    );
    const equipmentValStr = equipment
      .map((e) => convertKeyToValue(DivingEquipment, e.toString()))
      .toString();
    const typeValStr = type
      .map((t) => convertKeyToValue(DivingType, t.toString()))
      .toString();

    return {
      weatherVal,
      waveVal,
      currentVal,
      visibilityVal,
      equipmentValStr,
      typeValStr,
    };
  }

  async createDiveLog(userId: number, createDiveLogBody: CreateDiveLogReqDto) {
    //이거 좀 줄일 수 있지않을까?
    const {
      weatherVal,
      waveVal,
      currentVal,
      visibilityVal,
      equipmentValStr,
      typeValStr,
    } = await this.convertKeyToValueForLog(createDiveLogBody);

    //이거 잘 될지 모르겠음. 안되면 body에서 로그랑 디테일 분리하자
    const { identifiers } = await this.diveLogRepository.insert({
      userId,
      ...createDiveLogBody,
    });
    await this.diveLogDetailRepository.insert({
      logId: identifiers[0].id,
      ...createDiveLogBody,
      weather: weatherVal,
      wave: waveVal,
      current: currentVal,
      visibility: visibilityVal,
      equipment: equipmentValStr,
      type: typeValStr,
    });

    return MsgResDto.success();
  }

  // 부분 수정(log와 logDetail 따로)이 있어도 괜찮을듯?
  async modifyDiveLog(
    logId: number,
    userId: number,
    modifyDiveLogBody: ModifyDiveLogReqDto,
  ) {
    const {
      weatherVal,
      waveVal,
      currentVal,
      visibilityVal,
      equipmentValStr,
      typeValStr,
    } = await this.convertKeyToValueForLog(modifyDiveLogBody);

    if (
      !(await this.diveLogRepository.exists({ where: { id: logId, userId } }))
    )
      throw new DiversException('NO_DIVELOG');

    await this.diveLogRepository.save({
      id: logId,
      ...modifyDiveLogBody,
    });

    await this.diveLogDetailRepository.save({
      logId,
      ...modifyDiveLogBody,
      weather: weatherVal,
      wave: waveVal,
      current: currentVal,
      visibility: visibilityVal,
      equipment: equipmentValStr,
      type: typeValStr,
    });

    return MsgResDto.success();
  }

  async removeDiveLog(logId: number, userId: number) {
    //디테일 자동으로 soft remove 가능할까?
    await this.diveLogRepository.softRemove({ id: logId, userId }).catch(() => {
      throw new DiversException('NO_DIVELOG');
    });

    return MsgResDto.success();
  }
}
