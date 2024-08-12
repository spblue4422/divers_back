import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiveShopInListResDto } from '@/apis/diveShop/dtos/diveShopInListRes.dto';
import { DiveShopResDto } from '@/apis/diveShop/dtos/diveShopRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiversException } from '@/common/exceptions';
import { DiveShop } from '@/entities/index';

@Injectable()
export class DiveShopRepository extends Repository<DiveShop> {
  constructor(private dataSource: DataSource) {
    super(DiveShop, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<DiveShop>,
    order?: FindOptionsOrder<DiveShop>,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
    }).then(([data, count]) => ({
      dataList: data.map((d) => DiveShopInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  async findOneByShopId(shopId: number): Promise<DiveShopResDto> {
    return this.findOneOrFail({ where: { id: shopId } })
      .then((d) => DiveShopResDto.makeRes(d))
      .catch(() => {
        throw new DiversException('NO_DIVESHOP');
      });
  }
}
