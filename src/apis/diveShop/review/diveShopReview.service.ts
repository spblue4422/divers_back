import { Injectable } from '@nestjs/common';
import { DiveShopReviewRepository } from './diveShopReview.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopReviewInListResDto } from './dtos/diveShopReviewInListRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { CreateDiveShopReviewReqDto } from './dtos/createDiveShopReviewReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';

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

  async modifyReview(shopId: number, reviewId: number, modifyReviewBody) {
    // await this.diveShopReviewRepository.f
    return MsgResDto.success();
  }

  async deleteReview(shopId: number, reviewId: number) {}

  async recommendReview(reviewId: number) {}
}
