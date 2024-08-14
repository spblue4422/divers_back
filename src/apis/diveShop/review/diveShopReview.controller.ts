import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { DiveShopReviewService } from '@/apis/diveShop/review/diveShopReview.service';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { DiveShopReviewResDto } from '@/apis/diveShop/review/dtos/diveShopReviewRes.dto';
import { Current } from '@/common/decorators/current';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';

@UseGuards(AuthRoleGuard)
@Controller('')
export class DiveShopReviewController {
  constructor(private readonly diveShopReviewServcie: DiveShopReviewService) {}

  @ApiOkResponse({
    type: ListResDto<DiveShopReviewResDto>,
    description: '다이브샵 리뷰 목록 조회',
  })
  @Get('/list/')
  async getReviewListByShopId(
    @Param('shopId') shopId: number,
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DiveShopReviewResDto>> {
    const { page, pagingCount } = paginationForm;
    return this.diveShopReviewServcie.getDiveShopReviewListById(
      shopId,
      page,
      pagingCount,
    );
  }

  //이거 되나?
  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 생성',
  })
  @Post('/:shopId')
  async createDiveShopReview(
    @Param('shopId') shopId: number,
    @Body() createReviewBody: CreateDiveShopReviewReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveShopReviewServcie.createDiveShopReview(
      shopId,
      userId,
      createReviewBody,
    );
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 수정',
  })
  @Patch('/:reviewId')
  async modifyDiveShopReview(
    @Param('reviewId') reviewId: number,
    @Body() modifyReviewBody,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveShopReviewServcie.modifyDiveShopReview(
      reviewId,
      userId,
      modifyReviewBody,
    );
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 삭제',
  })
  @Delete('/:reviewId')
  async removeDiveShopReview(
    // @Param('shopId') shopId: number,
    @Param('reviewId') reviewId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveShopReviewServcie.removeDiveShopReview(reviewId, userId);
  }
}
