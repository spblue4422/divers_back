import { FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DivePointService } from '../divePoint.service';
import { CreateDivePointReviewReqDto } from './dtos/createDivePointReviewReq.dto';
import { DivePointReviewResDto } from './dtos/divePointReviewRes.dto';
import { DivePointReviewRepository } from '@/apis/divePoint/review/divePointReview.repository';
import { ModifyDivePointReviewReqDto } from '@/apis/divePoint/review/dtos/modifyDivePointReviewReq.dto';
import { RecommendationService } from '@/apis/recommendation/recommendation.service';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { DiversException } from '@/common/exceptions';
import { DivePointReview } from '@/entities';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DivePointReviewService {
  constructor(
    private readonly divePointService: DivePointService,
    private readonly recommendationService: RecommendationService,
    private readonly divePointReviewRepository: DivePointReviewRepository,
  ) {}

  async getDivePointReviewListByDivePoint(
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

  // handle을 사용하면서 생기는 필연적인 문제.
  // 속도 측면에서 user 테이블에서 handle로 userId를 검색하고 userId를 통해 검색하는게 나을까
  // 아니면 그냥 typeORM에서 join해서 handle로 찾는게 나을까
  async getDivePointReviewListByUser(
    userHandle: string,
    page: number,
    pagingCount: number,
    isOwner: boolean,
    order?,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    const where: FindOptionsWhere<DivePointReview> = isOwner
      ? { user: { authHandle: userHandle } }
      : { user: { authHandle: userHandle }, isBlocked: false };

    return this.divePointReviewRepository.findListWithCount(
      page,
      pagingCount,
      where,
      order ?? { createdAt: 'DESC' },
    );
  }

  async createDivePointReview(
    userId: number,
    createDivePointReviewBody: CreateDivePointReviewReqDto,
  ): Promise<MsgResDto> {
    const { shopId, shopName, pointId } = createDivePointReviewBody;

    await this.divePointService.getDivePoint(pointId);

    await this.divePointReviewRepository.insert({
      userId,
      shopId: shopId ?? null,
      shopName: shopName ?? null,
      ...createDivePointReviewBody,
    });

    return MsgResDto.success();
  }

  async modifyDivePointReview(
    reviewId: number,
    userId: number,
    modifyDivePointReviewBody: ModifyDivePointReviewReqDto,
  ): Promise<MsgResDto> {
    const { shopId, shopName } = modifyDivePointReviewBody;

    await this.divePointReviewRepository.updateAndCatchFail(
      { id: reviewId, userId },
      {
        shopId: shopId ?? null,
        shopName: shopName ?? null,
        ...modifyDivePointReviewBody,
      },
    );

    return MsgResDto.success();
  }

  async removeDivePointReview(
    reviewId: number,
    userId: number,
  ): Promise<MsgResDto> {
    await this.divePointReviewRepository
      .softDelete({ id: reviewId, userId })
      .catch(() => {
        throw new DiversException('NO_DIVEPOINT_REVIEW');
      });

    return MsgResDto.success();
  }

  @Transactional()
  async recommendDivePointReview(
    reviewId: number,
    userId: number,
  ): Promise<MsgResDto> {
    const { recommendation } =
      await this.divePointReviewRepository.findOneByReviewId(reviewId);

    const recommendOrCancel = await this.recommendationService.recommendTarget(
      userId,
      'DIVEPOINT_REVIEW',
      reviewId,
    );

    await this.divePointReviewRepository.updateAndCatchFail(
      { id: reviewId },
      { recommendation: recommendation + (recommendOrCancel ? 1 : -1) },
    );

    return MsgResDto.success();
  }
}
