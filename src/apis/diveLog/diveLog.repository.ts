import { Injectable } from '@nestjs/common';
import { DiveLog, DiveLogDetail } from 'src/entities';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveLogInListResDto } from './dtos/diveLogInListRes.dto';
import { DiversException } from 'src/common/exceptions';

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
      relations: { user: true }, // join안걸리면 그때 배열로 바꾸자
      order,
      skip: page - 1,
      take: pagingCount,
    }).then(([data, count]) => ({
      dataList: data.map((d) => DiveLogInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }
}

@Injectable()
export class DiveLogDetailRepository extends Repository<DiveLogDetail> {
  constructor(private dataSource: DataSource) {
    super(DiveLogDetail, dataSource.createEntityManager());
  }

  // 로그 조건별 리스트 뽑기에 사용할 수 있는 method
  async findListWithConditionWithCount(
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
}
