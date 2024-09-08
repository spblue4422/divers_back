import { FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';

import {
  DiveLogDetailRepository,
  DiveLogRepository,
} from '@/apis/diveLog/diveLog.repository';
import { CreateDiveLogReqDto } from '@/apis/diveLog/dtos/createDiveLogReq.dto';
import { DiveLogInListResDto } from '@/apis/diveLog/dtos/diveLogInListRes.dto';
import { DiveLogResDto } from '@/apis/diveLog/dtos/diveLogRes.dto';
import { ModifyDiveLogDetailReqDto } from '@/apis/diveLog/dtos/modifyDiveLogDetailReq.dto';
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

  async convertKeyToValueForDiveLog(
    keyObj: CreateDiveLogReqDto | ModifyDiveLogDetailReqDto,
  ) {
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
      weather: weatherVal,
      wave: waveVal,
      current: currentVal,
      visibility: visibilityVal,
      equipment: equipmentValStr,
      type: typeValStr,
    };
  }

  @Transactional()
  async createDiveLog(
    userId: number,
    createDiveLogBody: CreateDiveLogReqDto,
  ): Promise<MsgResDto> {
    //이거 좀 줄일 수 있지않을까?
    const valueObj = await this.convertKeyToValueForDiveLog(createDiveLogBody);

    const { identifiers } = await this.diveLogRepository.insert({
      userId,
      ...createDiveLogBody,
    });

    await this.diveLogDetailRepository.insert({
      logId: identifiers[0].id,
      ...createDiveLogBody,
      ...valueObj, // 이거 안되면 body랑 value 순서 바꿔보자
    });

    return MsgResDto.success();
  }

  async modifyDiveLog(
    logId: number,
    userId: number,
    modifyDiveLogBody: ModifyDiveLogReqDto,
  ): Promise<MsgResDto> {
    await this.diveLogRepository.updateAndCatchFail(
      { id: logId, userId },
      {
        ...modifyDiveLogBody,
      },
    );

    return MsgResDto.success();
  }

  async modifyDiveLogDetail(
    logId: number,
    userId: number,
    modifyDiveLogDetailBody: ModifyDiveLogDetailReqDto,
  ): Promise<MsgResDto> {
    const valueObj = await this.convertKeyToValueForDiveLog(
      modifyDiveLogDetailBody,
    );

    await this.diveLogRepository
      .exists({ where: { id: logId, userId } })
      .catch(() => {
        throw new DiversException('NO_DIVELOG');
      });

    await this.diveLogDetailRepository.updateAndCatchFail(
      { logId },
      {
        ...modifyDiveLogDetailBody,
        ...valueObj,
      },
    );

    return MsgResDto.success();
  }

  async removeDiveLog(logId: number, userId: number): Promise<MsgResDto> {
    await this.diveLogRepository.softDelete({ id: logId, userId }).catch(() => {
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
