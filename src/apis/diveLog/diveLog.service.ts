import { FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from '@/apis/diveLog/diveLog.repository';
import { CreateDiveLogReqDto } from '@/apis/diveLog/dtos/createDiveLogReq.dto';
import { DiveLogInListResDto } from '@/apis/diveLog/dtos/diveLogInListRes.dto';
import { DiveLogResDto } from '@/apis/diveLog/dtos/diveLogRes.dto';
import { ModifyDiveLogReqDto } from '@/apis/diveLog/dtos/modifyDiveLogReq.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import {
  DegreeExpression,
  DivingEquipment,
  DivingType,
  Weather,
} from '@/common/enums';
import { DiversException } from '@/common/exceptions';
import { convertKeyToValue } from '@/common/utils/enumConverter';
import { DiveLog } from '@/entities/index';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DiveLogService {
  constructor(
    private readonly diveLogRepository: DiveLogRepository,
    private readonly diveLogDetailRepository: DiveLogDetailRepository,
  ) {}

  async getDiveLogListByUser(
    userHandle: string,
    page: number,
    pagingCount: number,
    isOwner: boolean,
    order?,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const where: FindOptionsWhere<DiveLog> = isOwner
      ? { user: { authHandle: userHandle } }
      : { user: { authHandle: userHandle }, isPublic: true, isBlocked: false };

    return this.diveLogRepository.findListWithCount(
      page,
      pagingCount,
      where,
      order ?? {
        createdAt: 'DESC',
      },
    );
  }

  async getDiveLog(logId: number, userId: number): Promise<DiveLogResDto> {
    const entireLog = await this.diveLogDetailRepository.findOneByLogId(logId);

    const { diveLog } = entireLog;

    if (diveLog.userId == userId) return DiveLogResDto.makeDetailRes(entireLog);
    else if (diveLog.isPublic) {
      if (diveLog.isBlocked) throw new DiversException('BLOCKED_DIVELOG');
      else return DiveLogResDto.makeDetailRes(entireLog);
    } else throw new DiversException('NO_ACCESS_PRIVATE_DIVELOG');
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

  @Transactional()
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
  @Transactional()
  async modifyDiveLog(
    logId: number,
    userId: number,
    modifyDiveLogBody: ModifyDiveLogReqDto,
  ): Promise<MsgResDto> {
    const {
      weatherVal,
      waveVal,
      currentVal,
      visibilityVal,
      equipmentValStr,
      typeValStr,
    } = await this.convertKeyToValueForLog(modifyDiveLogBody);

    await this.diveLogRepository.updateAndCatchFail(
      { id: logId, userId },
      {
        ...modifyDiveLogBody,
      },
    );

    await this.diveLogDetailRepository.updateAndCatchFail(
      { logId },
      {
        ...modifyDiveLogBody,
        weather: weatherVal,
        wave: waveVal,
        current: currentVal,
        visibility: visibilityVal,
        equipment: equipmentValStr,
        type: typeValStr,
      },
    );

    return MsgResDto.success();
  }

  async removeDiveLog(logId: number, userId: number): Promise<MsgResDto> {
    //디테일 자동으로 soft remove 가능할까?
    await this.diveLogRepository.softRemove({ id: logId, userId }).catch(() => {
      throw new DiversException('NO_DIVELOG');
    });

    return MsgResDto.success();
  }

  async changeIsPublic(
    logId: number,
    userId: number,
    isPublic: string,
  ): Promise<MsgResDto> {
    await this.diveLogRepository.updateAndCatchFail(
      { id: logId, userId },
      { isPublic: isPublic == 'public' },
    );

    return MsgResDto.success();
  }
}
