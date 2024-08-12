import { Injectable } from '@nestjs/common';

import { DivePointRepostiory } from '@/apis/divePoint/divePoint.repository';
import { DivePointInListResDto } from '@/apis/divePoint/dtos/divePointInListRes.dto';
import { DivePointResDto } from '@/apis/divePoint/dtos/divePointRes.dto';
import { RecommendationService } from '@/apis/recommendation/recommendation.service';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';

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
    return this.divePointRepository.findOneByPointId(pointId);
  }

  async recommendDivePoint(
    pointId: number,
    userId: number,
  ): Promise<MsgResDto> {
    const { recommendation } =
      await this.divePointRepository.findOneByPointId(pointId);

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
