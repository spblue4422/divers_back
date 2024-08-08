import { Injectable } from '@nestjs/common';
import { DivePointRepostiory } from './divePoint.repository';
import { DivePointResDto } from './dtos/divePointRes.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { RecommendationService } from '../recommendation/recommednation.service';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DivePointInListResDto } from './dtos/divePointInListRes.dto';

@Injectable()
export class DivePointService {
  constructor(
    private readonly divePointRepository: DivePointRepostiory,
    private readonly recommendationService: RecommendationService,
  ) {}

  async getDivePointList(
    paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DivePointInListResDto>> {
    const { page, pagingCount } = paginationForm;

    return this.divePointRepository.findListWithCount(page, pagingCount);
  }

  async getDivePoint(pointId: number): Promise<DivePointResDto> {
    return this.divePointRepository.findByIdOrFail(pointId);
  }

  async recommendDivePoint(
    pointId: number,
    userId: number,
  ): Promise<MsgResDto> {
    const { recommendation } =
      await this.divePointRepository.findByIdOrFail(pointId);

    const recommendOrCancel = await this.recommendationService.recommendTarget(
      userId,
      'DIVEPOINT',
      pointId,
    );

    await this.divePointRepository.update(
      { id: pointId },
      { recommendation: recommendation + (recommendOrCancel ? 1 : -1) },
    );

    return MsgResDto.success();
  }
}
