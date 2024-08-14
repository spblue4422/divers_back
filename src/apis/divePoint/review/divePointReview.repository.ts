import {
  DataSource,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DivePointReviewResDto } from '@/apis/divePoint/review/dtos/divePointReviewRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DivePointReview } from '@/entities/index';

@Injectable()
export class DivePointReviewRepository extends Repository<DivePointReview> {
  constructor(private dataSource: DataSource) {
    super(DivePointReview, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<DivePointReview>,
    order?: FindOptionsOrder<DivePointReview>,
    relations?: FindOptionsRelations<DivePointReview>,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
      relations,
    }).then(([data, count]) => ({
      dataList: data.map((d) => DivePointReviewResDto.makeRes(d)),
      totalCount: count,
    }));
  }
}
