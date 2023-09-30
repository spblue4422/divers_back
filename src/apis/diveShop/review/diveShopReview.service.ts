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

  async getShopReviewList(
    shopId: number,
    pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveShopReviewInListResDto>> {
    const { page, pagingCount } = pagination;

    return this.diveShopReviewRepository.findListWithCount(page, pagingCount, {
      shopId,
    });
  }

  async createReview(createReviewBody: CreateDiveShopReviewReqDto) {}

  async modifyReview(reviewId: number, modifyReviewBody) {}

  async deleteReview(reviewId: number) {}

  async recommendReview(reviewId: number) {}
}
