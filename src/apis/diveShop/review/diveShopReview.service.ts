import { Injectable } from '@nestjs/common';

import { DiveShopService } from '@/apis/diveShop/diveShop.service';
import { DiveShopReviewRepository } from '@/apis/diveShop/review/diveShopReview.repository';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { DiveShopReviewResDto } from '@/apis/diveShop/review/dtos/diveShopReviewRes.dto';
import { RecommendationService } from '@/apis/recommendation/recommendation.service';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { DiversException } from '@/common/exceptions';
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
  ) {
    return this.diveShopReviewRepository.findListWithCount(
      page,
      pagingCount,
      {
        user: {
          authHandle: userHandle,
        },
        isBlocked: isOwner,
      },
      order ?? { createdAt: 'DESC' },
    );
  }

  async createDiveShopReview(
    shopId: number,
    userId: number,
    createReviewBody: CreateDiveShopReviewReqDto,
  ): Promise<MsgResDto> {
    await this.diveShopService.getDiveShop(shopId);

    await this.diveShopReviewRepository.insert({
      shopId,
      userId,
      ...createReviewBody,
    });

    return MsgResDto.success();
  }

  async modifyDiveShopReview(
    reviewId: number,
    userId: number,
    modifyReviewBody,
  ): Promise<MsgResDto> {
    await this.diveShopReviewRepository.updateAndCatchFail(
      { id: reviewId, userId },
      { ...modifyReviewBody },
    );

    return MsgResDto.success();
  }

  async removeDiveShopReview(reviewId: number, userId: number) {
    await this.diveShopReviewRepository.softDelete({ id: reviewId, userId });

    return MsgResDto.success();
  }

  @Transactional()
  async recommendDiveShopReview(reviewId: number, userId: number) {
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
