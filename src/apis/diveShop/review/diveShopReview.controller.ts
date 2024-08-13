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

import { AuthGuard } from '@/apis/auth/guards/auth.guard';
import { DiveShopReviewService } from '@/apis/diveShop/review/diveShopReview.service';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { DiveShopReviewInListResDto } from '@/apis/diveShop/review/dtos/diveShopReviewInListRes.dto';
import { Current } from '@/common/decorators/current';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';

@UseGuards(AuthGuard)
@Controller('shopReview')
export class DiveShopReviewController {
  constructor(private readonly diveShopReviewServcie: DiveShopReviewService) {}

  @ApiOkResponse({
    type: ListResDto<DiveShopReviewInListResDto>,
    description: '다이브샵 리뷰 목록 조회',
  })
  @Get('/:shopId/list/')
  async getReviewListByShopId(
    @Param('shopId') shopId: number,
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DiveShopReviewInListResDto>> {
    return this.diveShopReviewServcie.getShopReviewListById(
      shopId,
      paginationForm,
    );
  }

  //이거 되나?
  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 생성',
  })
  @Post('/:shopId/create')
  async createReview(
    @Param('shopId') shopId: number,
    @Body() createReviewBody: CreateDiveShopReviewReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId } = cur;

    return this.diveShopReviewServcie.createReview(
      shopId,
      keyId,
      createReviewBody,
    );
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 수정',
  })
  @Patch('/:reviewId/modify')
  async modifyReview(
    @Param('reviewId') reviewId: number,
    @Body() modifyReviewBody,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId } = cur;

    return this.diveShopReviewServcie.modifyReview(
      reviewId,
      keyId,
      modifyReviewBody,
    );
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 삭제',
  })
  @Delete('/:reviewId/remove')
  async removeReview(
    // @Param('shopId') shopId: number,
    @Param('reviewId') reviewId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId } = cur;

    return this.diveShopReviewServcie.removeReview(reviewId, keyId);
  }
}
