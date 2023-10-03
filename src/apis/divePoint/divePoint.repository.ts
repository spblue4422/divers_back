import { Injectable } from '@nestjs/common';
import DivePoint from 'src/entities/DivePoint';
import { Repository } from 'typeorm';
import { DivePointResDto } from './dtos/divePointRes.dto';
import { throwErr } from 'src/common/utils/errorHandler';

@Injectable()
export class DivePointRepostiory extends Repository<DivePoint> {
  async findByIdOrFail(pointId: number) {
    return this.findOneOrFail({ where: { id: pointId } })
      .then((d) => DivePointResDto.makeRes(d))
      .catch(() => throwErr('NO_DIVEPOINT'));
  }
}
