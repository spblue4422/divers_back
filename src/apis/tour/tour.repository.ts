import { Injectable } from '@nestjs/common';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { Tour } from 'src/entities';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { TourInListResDto } from './dtos/tourInListRes.dto';

@Injectable()
export class TourRepository extends Repository<Tour> {
  constructor(private dataSource: DataSource) {
    super(Tour, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<Tour>,
    order?: FindOptionsOrder<Tour>,
  ): Promise<ListResDto<TourInListResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
    }).then(([data, count]) => ({
      dataList: data.map((d) => TourInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }
}
