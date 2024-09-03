import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CountryResDto } from '@/apis/country/dtos/countryRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiversException } from '@/common/exceptions';
import { Country } from '@/entities';

@Injectable()
export class countryRepository extends Repository<Country> {
  constructor(private dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<Country>,
    order?: FindOptionsOrder<Country>,
  ): Promise<ListResDto<CountryResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
    }).then(([data, count]) => ({
      dataList: data.map((d) => CountryResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  async findOneByCountryCode(code: string): Promise<CountryResDto> {
    return this.findOneByOrFail({ countryCode: code }).catch(() => {
      throw new DiversException('NO_COUNTRY');
    });
  }
}
