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
      { user: true },
    );
  }

  // handle을 사용하면서 생기는 필연적인 문제.
  // 속도 측면에서 user 테이블에서 handle로 userId를 검색하고 userId를 통해 검색하는게 나을까
  // 아니면 그냥 typeORM에서 join해서 handle로 찾는게 나을까
  async getDivePointReviewListByHandle(
    userHandle: string,
    page: number,
    pagingCount: number,
    isOwner: boolean,
    order?,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    return this.divePointReviewRepository.findListWithCount(
      page,
      pagingCount,
      {
        user: {
          authHandle: userHandle,
        },
        isBlocked: isOwner,
      },
      order ?? { createdAt: 'DESC' },
      { user: true },
    );
  }
}
