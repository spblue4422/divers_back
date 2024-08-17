import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiveShopReviewResDto } from '@/apis/diveShop/review/dtos/diveShopReviewRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiversException } from '@/common/exceptions';
import { UpdateCriteria } from '@/common/types';
import { DiveShopReview } from '@/entities/index';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class DiveShopReviewRepository extends Repository<DiveShopReview> {
  constructor(private dataSource: DataSource) {
    super(DiveShopReview, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<DiveShopReview>,
    order?: FindOptionsOrder<DiveShopReview>,
  ): Promise<ListResDto<DiveShopReviewResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
      relations: { user: true },
    }).then(([data, count]) => ({
      dataList: data.map((d) => DiveShopReviewResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  async findOneByReviewId(reviewId: number): Promise<DiveShopReview> {
    return this.findOneOrFail({ where: { id: reviewId } }).catch(() => {
      throw new DiversException('NO_DIVESHOP_REVIEW');
    });
  }

  async updateAndCatchFail(
    where: UpdateCriteria<DiveShopReview>,
    target: QueryDeepPartialEntity<DiveShopReview>,
  ): Promise<UpdateResult> {
    return this.update(where, target).catch(() => {
      throw new DiversException('NO_DIVESHOP_REVIEW');
    });
  }
}
