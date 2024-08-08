import { Injectable } from '@nestjs/common';
import { DivePoint } from 'src/entities';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { DivePointResDto } from './dtos/divePointRes.dto';
import { DiversException } from 'src/common/exceptions';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DivePointInListResDto } from './dtos/divePointInListRes.dto';

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

  async findByIdOrFail(pointId: number) {
    return this.findOneOrFail({ where: { id: pointId } })
      .then((d) => DivePointResDto.makeRes(d))
      .catch(() => {
        throw new DiversException('NO_DIVEPOINT');
      });
  }
}
