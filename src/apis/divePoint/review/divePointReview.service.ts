import { Injectable } from '@nestjs/common';

import { DivePointReviewResDto } from './dtos/divePointReviewRes.dto';
import { DivePointReviewRepository } from '@/apis/divePoint/review/divePointReview.repository';
import { ListResDto } from '@/common/dtos/listRes.dto';

@Injectable()
export class DivePointReviewService {
  constructor(
    private readonly divePointReviewRepository: DivePointReviewRepository,
  ) {}

  async getDivePointReviewListByPointId(
    pointId: number,
    page: number,
    pagingCount: number,
    order?,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    return this.divePointReviewRepository.findListWithCount(
      page,
      pagingCount,
      {
        pointId,
        isBlocked: false,
      },
      order ?? { createdAt: 'DESC' },
    );
  }

  async getDivePointReviewListByUserId(
    userId: number,
    page: number,
    pagingCount: number,
    order?,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    return this.divePointReviewRepository.findListWithCount(
      page,
      pagingCount,
      {
        userId,
        isBlocked: false,
      },
      order ?? { createdAt: 'DESC' },
    );
  }
}
