import { Injectable } from '@nestjs/common';

import { DiveShopReviewRepository } from '@/apis/diveShop/review/diveShopReview.repository';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { DiveShopReviewResDto } from '@/apis/diveShop/review/dtos/diveShopReviewRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { DiversException } from '@/common/exceptions';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DiveShopReviewService {
  constructor(
    private readonly diveShopReviewRepository: DiveShopReviewRepository,
  ) {}

  async getDiveShopReviewListById(
    shopId: number,
    page: number,
    pagingCount: number,
  ): Promise<ListResDto<DiveShopReviewResDto>> {
    return this.diveShopReviewRepository.findListWithCount(page, pagingCount, {
      shopId,
    });
  }

  async createDiveShopReview(
    shopId: number,
    userId: number,
    createReviewBody: CreateDiveShopReviewReqDto,
  ): Promise<MsgResDto> {
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
  ) {
    await this.diveShopReviewRepository.update(
      { id: reviewId, userId },
      { ...modifyReviewBody },
    );

    return MsgResDto.success();
  }

  async removeDiveShopReview(reviewId: number, userId: number) {
    await this.diveShopReviewRepository
      .findOneByOrFail({
        id: reviewId,
        userId,
      })
      .catch(() => {
        throw new DiversException('NO_DIVESHOP_REVIEW');
      });

    await this.diveShopReviewRepository.softDelete({ id: reviewId });

    return MsgResDto.success();
  }

  @Transactional()
  async recommendReview(reviewId: number) {}
}
