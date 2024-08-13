import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiveShopReviewInListResDto } from '@/apis/diveShop/review/dtos/diveShopReviewInListRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiveShopReview } from '@/entities/index';

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
  ): Promise<ListResDto<DiveShopReviewInListResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
      relations: { user: true },
    }).then(([data, count]) => ({
      dataList: data.map((d) => DiveShopReviewInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  // async findBy
}
