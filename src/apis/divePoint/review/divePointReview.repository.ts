import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DivePointReviewResDto } from '@/apis/divePoint/review/dtos/divePointReviewRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiversException } from '@/common/exceptions';
import { UpdateCriteria } from '@/common/types';
import { DivePointReview } from '@/entities/index';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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
  ): Promise<ListResDto<DivePointReviewResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
      relations: { user: true },
    }).then(([data, count]) => ({
      dataList: data.map((d) => DivePointReviewResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  async findOneByReviewId(reviewId: number): Promise<DivePointReview> {
    return this.findOneOrFail({ where: { id: reviewId } }).catch(() => {
      throw new DiversException('NO_DIVEPOINT_REVIEW');
    });
  }

  async updateAndCatchFail(
    where: UpdateCriteria<DivePointReview>,
    target: QueryDeepPartialEntity<DivePointReview>,
  ): Promise<UpdateResult> {
    return this.update(where, target).catch(() => {
      throw new DiversException('NO_DIVEPOINT_REVIEW');
    });
  }
}
