import { Injectable } from '@nestjs/common';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import DiveShopReview from 'src/entities/DiveShopReview';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { DiveShopReviewInListResDto } from './dtos/diveShopReviewInListRes.dto';

@Injectable()
export class DiveShopReviewRepository extends Repository<DiveShopReview> {
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
    }).then(([data, count]) => ({
      dataList: data.map((d) => DiveShopReviewInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }
}
