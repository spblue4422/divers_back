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
}
