import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DivePointInListResDto } from '@/apis/divePoint/dtos/divePointInListRes.dto';
import { DivePointResDto } from '@/apis/divePoint/dtos/divePointRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiversException } from '@/common/exceptions';
import { DivePoint } from '@/entities/index';

@Injectable()
export class DivePointRepostiory extends Repository<DivePoint> {
  constructor(private dataSource: DataSource) {
    super(DivePoint, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<DivePoint>,
    order?: FindOptionsOrder<DivePoint>,
  ): Promise<ListResDto<DivePointInListResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
    }).then(([data, count]) => ({
      dataList: data.map((d) => DivePointInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  async findOneByPointId(pointId: number) {
    return this.findOneOrFail({ where: { id: pointId } })
      .then((d) => DivePointResDto.makeRes(d))
      .catch((err) => {
        console.log(err);
        throw new DiversException('NO_DIVEPOINT');
      });
  }
}
