import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiveLogInListResDto } from '@/apis/diveLog/dtos/diveLogInListRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiversException } from '@/common/exceptions';
import { UpdateCriteria } from '@/common/types';
import { DiveLog, DiveLogDetail } from '@/entities/index';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class DiveLogRepository extends Repository<DiveLog> {
  constructor(private dataSource: DataSource) {
    super(DiveLog, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<DiveLog>,
    order?: FindOptionsOrder<DiveLog>,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
      relations: { user: true },
    }).then(([data, count]) => ({
      dataList: data.map((d) => DiveLogInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  async updateAndCatchFail(
    where: UpdateCriteria<DiveLog>,
    target: QueryDeepPartialEntity<DiveLog>,
  ): Promise<UpdateResult> {
    return this.update(where, target).catch(() => {
      throw new DiversException('NO_DIVELOG');
    });
  }
}

@Injectable()
export class DiveLogDetailRepository extends Repository<DiveLogDetail> {
  constructor(private dataSource: DataSource) {
    super(DiveLogDetail, dataSource.createEntityManager());
  }

  // 로그 조건별 리스트 뽑기에 사용할 수 있는 method
  async findListWithWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<DiveLogDetail>,
    order?: FindOptionsOrder<DiveLogDetail>,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    return this.findAndCount({
      where,
      relations: { diveLog: { user: true } }, // join안걸리면 그때 배열로 바꾸자
      order,
      skip: page - 1,
      take: pagingCount,
    }).then(([data, count]) => ({
      dataList: data.map((d) => DiveLogInListResDto.makeRes(d.diveLog)),
      totalCount: count,
    }));
  }

  async findOneByLogId(logId: number): Promise<DiveLogDetail> {
    return this.findOneOrFail({
      where: {
        logId,
      },
      relations: { diveLog: { user: true } },
    }).catch(() => {
      throw new DiversException('NO_DIVELOG');
    });
  }

  async updateAndCatchFail(
    where: UpdateCriteria<DiveLogDetail>,
    target: QueryDeepPartialEntity<DiveLogDetail>,
  ): Promise<UpdateResult> {
    return this.update(where, target).catch(() => {
      throw new DiversException('NO_DIVELOG');
    });
  }
}
