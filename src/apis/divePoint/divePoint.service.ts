import { Injectable } from '@nestjs/common';
import { DivePointRepostiory } from './divePoint.repository';
import { DivePointResDto } from './dtos/divePointRes.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { RecommendationService } from '../recommendation/recommednation.service';

@Injectable()
export class DivePointService {
  constructor(
    private readonly divePointRepository: DivePointRepostiory,
    private readonly recommendationService: RecommendationService,
  ) {}

  async getDivePointList(page: number, count: number) {
    return this.divePointRepository.findAndCount({
      order: { name: 'ASC' },
      skip: page - 1,
      take: count,
    });
  }

  async getDivePoint(pointId: number): Promise<DivePointResDto> {
    return await this.divePointRepository.findByIdOrFail(pointId);
  }

  async recommendDivePoint(pointId: number): Promise<MsgResDto> {
    const { recommendation } =
      await this.divePointRepository.findByIdOrFail(pointId);

    await this.recommendationService.recommendTarget(
      pointId,
      pointId,
      'DIVEPOINT',
    );

    await this.divePointRepository.update(
      { id: pointId },
      { recommendation: recommendation + 1 },
    );

    return MsgResDto.success();
  }
}
