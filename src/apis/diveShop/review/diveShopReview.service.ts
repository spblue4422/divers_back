import { FindOptionsWhere } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiveShopService } from '@/apis/diveShop/diveShop.service';
import { DiveShopReviewRepository } from '@/apis/diveShop/review/diveShopReview.repository';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { DiveShopReviewResDto } from '@/apis/diveShop/review/dtos/diveShopReviewRes.dto';
import { ModifyDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/modifyDiveShopReviewReq.dto';
import { RecommendationService } from '@/apis/recommendation/recommendation.service';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { DiversException } from '@/common/exceptions';
import { DiveShopReview } from '@/entities';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DiveShopReviewService {
  constructor(
    private readonly diveShopService: DiveShopService,
    private readonly recommendationService: RecommendationService,
    private readonly diveShopReviewRepository: DiveShopReviewRepository,
  ) {}

  async getDiveShopReviewListByDiveShop(
    shopId: number,
    page: number,
    pagingCount: number,
    order?,
  ): Promise<ListResDto<DiveShopReviewResDto>> {
    return this.diveShopReviewRepository.findListWithCount(
      page,
      pagingCount,
      {
        shopId,
      },
      order ?? { createdAt: 'DESC' },
    );
  }

  async getDiveShopReviewListByUser(
    userHandle: string,
    page: number,
    pagingCount: number,
    isOwner: boolean,
    order?,
  ): Promise<ListResDto<DiveShopReviewResDto>> {
    const where: FindOptionsWhere<DiveShopReview> = isOwner
      ? { user: { authHandle: userHandle } }
      : { user: { authHandle: userHandle }, isBlocked: false };

    return this.diveShopReviewRepository.findListWithCount(
      page,
      pagingCount,
      where,
      order ?? { createdAt: 'DESC' },
    );
  }

  async createDiveShopReview(
    userId: number,
    createDiveShopReviewBody: CreateDiveShopReviewReqDto,
  ): Promise<MsgResDto> {
    const { shopId } = createDiveShopReviewBody;

    await this.diveShopService.getDiveShop(shopId);

    await this.diveShopReviewRepository.insert({
      userId,
      ...createDiveShopReviewBody,
    });

    return MsgResDto.success();
  }

  async modifyDiveShopReview(
    reviewId: number,
    userId: number,
    modifyDiveShopReviewBody: ModifyDiveShopReviewReqDto,
  ): Promise<MsgResDto> {
    await this.diveShopReviewRepository.updateAndCatchFail(
      { id: reviewId, userId },
      { ...modifyDiveShopReviewBody },
    );

    return MsgResDto.success();
  }

  async removeDiveShopReview(
    reviewId: number,
    userId: number,
  ): Promise<MsgResDto> {
    await this.diveShopReviewRepository
      .softDelete({ id: reviewId, userId })
      .catch(() => {
        throw new DiversException('NO_DIVESHOP_REVIEW');
      });

    return MsgResDto.success();
  }

  @Transactional()
  async recommendDiveShopReview(
    reviewId: number,
    userId: number,
  ): Promise<MsgResDto> {
    const { recommendation } =
      await this.diveShopReviewRepository.findOneByReviewId(reviewId);

    const recommendOrCancel = await this.recommendationService.recommendTarget(
      userId,
      'DIVESHOP_REVIEW',
      reviewId,
    );

    await this.diveShopReviewRepository.updateAndCatchFail(
      { id: reviewId },
      { recommendation: recommendation + (recommendOrCancel ? 1 : -1) },
    );

    return MsgResDto.success();
  }
}
