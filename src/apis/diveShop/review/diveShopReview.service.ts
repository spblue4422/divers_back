import { Injectable } from '@nestjs/common';

import { DiveShopReviewRepository } from '@/apis/diveShop/review/diveShopReview.repository';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { DiveShopReviewInListResDto } from '@/apis/diveShop/review/dtos/diveShopReviewInListRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { DiversException } from '@/common/exceptions';

@Injectable()
export class DiveShopReviewService {
  constructor(
    private readonly diveShopReviewRepository: DiveShopReviewRepository,
  ) {}

  async getShopReviewListById(
    shopId: number,
    pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveShopReviewInListResDto>> {
    const { page, pagingCount } = pagination;

    return this.diveShopReviewRepository.findListWithCount(page, pagingCount, {
      shopId,
    });
  }

  async createReview(
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

  async modifyReview(reviewId: number, userId: number, modifyReviewBody) {
    await this.diveShopReviewRepository
      .findOneByOrFail({
        id: reviewId,
        userId,
      })
      .catch(() => {
        throw new DiversException('NO_DIVESHOP_REVIEW');
      });

    // save 들어갈 자리

    return MsgResDto.success();
  }

  async removeReview(reviewId: number, userId: number) {
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

  async recommendReview(reviewId: number) {}
}
