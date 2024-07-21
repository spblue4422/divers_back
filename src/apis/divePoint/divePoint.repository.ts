import { Injectable } from '@nestjs/common';
import { DivePoint } from 'src/entities';
import { DataSource, Repository } from 'typeorm';
import { DivePointResDto } from './dtos/divePointRes.dto';
import { DiversException } from 'src/common/exceptions';

@Injectable()
export class DivePointRepostiory extends Repository<DivePoint> {
  constructor(private dataSource: DataSource) {
    super(DivePoint, dataSource.createEntityManager());
  }

  async findByIdOrFail(pointId: number) {
    return this.findOneOrFail({ where: { id: pointId } })
      .then((d) => DivePointResDto.makeRes(d))
      .catch(() => {
        throw new DiversException('NO_DIVEPOINT');
      });
  }
}
