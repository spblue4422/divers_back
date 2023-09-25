import { Injectable } from '@nestjs/common';
import { DivePointRepostiory } from './divePoint.repository';
import { throwErr } from 'src/common/utils/errorHandler';
import { DivePointResDto } from './dtos/divePointRes.dto';

@Injectable()
export class DivePointService {
  constructor(private readonly divePointRepository: DivePointRepostiory) {}

  async getDivePointList(page: number, count: number) {
    return this.divePointRepository.findAndCount({
      order: { name: 'ASC' },
      skip: page - 1,
      take: count,
    });
  }

  async getOneDivePoint(pointId: number): Promise<DivePointResDto> {
    const divePoint = await this.divePointRepository.findOne({
      where: { id: pointId },
    });

    if (!divePoint) throwErr('NO_DIVEPOINT');

    return DivePointResDto.makeRes(divePoint);
  }
}
