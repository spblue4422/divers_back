import { Injectable } from '@nestjs/common';
import { DivePoint } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { DivePointResDto } from './dtos/divePointRes.dto';
import { throwErr } from 'src/common/utils/errorHandler';

@Injectable()
export class DivePointRepostiory extends Repository<DivePoint> {
  constructor(private dataSource: DataSource) {
    super(DivePoint, dataSource.createEntityManager());
  }

  async findByIdOrFail(pointId: number) {
    return this.findOneOrFail({ where: { id: pointId } })
      .then((d) => DivePointResDto.makeRes(d))
      .catch(() => throwErr('NO_DIVEPOINT'));
  }
}
