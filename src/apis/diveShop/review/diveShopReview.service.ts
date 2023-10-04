import { Injectable } from '@nestjs/common';
import { DiveShopReviewRepository } from './diveShopReview.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopReviewInListResDto } from './dtos/diveShopReviewInListRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { CreateDiveShopReviewReqDto } from './dtos/createDiveShopReviewReq.dto';

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
    createReviewBody: CreateDiveShopReviewReqDto,
  ) {}

  async modifyReview(shopId: number, reviewId: number, modifyReviewBody) {}

  async deleteReview(shopId: number, reviewId: number) {}

  async recommendReview(reviewId: number) {}
}
