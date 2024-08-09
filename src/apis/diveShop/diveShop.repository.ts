import { Injectable } from '@nestjs/common';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DiveShop } from 'src/entities';
import { DiveShopInListResDto } from './dtos/diveShopInListRes.dto';
import { DiveShopResDto } from './dtos/diveShopRes.dto';
import { DiversException } from 'src/common/exceptions';

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
