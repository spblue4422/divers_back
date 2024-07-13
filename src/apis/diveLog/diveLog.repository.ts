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

  async getDiveLogListWithCount(
    page: number,
    pagingCount: number,
    isOwned: boolean,
    where?: FindOptionsWhere<DiveLog>,
    order?: FindOptionsOrder<DiveLog>,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
    }).then(([data, count]) => ({
      // 잘 안되면 그때 가서 makeRes를 async로 했던 이유 다시 생각해보기
      dataList: data.map((d) => DiveLogInListResDto.makeRes(d, isOwned)),
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
