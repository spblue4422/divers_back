import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DiveShopReviewService } from './diveShopReview.service';
import { CreateDiveShopReviewReqDto } from './dtos/createDiveShopReviewReq.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopReviewInListResDto } from './dtos/diveShopReviewInListRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';

@Controller('diveShop/:shopId/review')
export class DiveShopReviewController {
  constructor(private readonly diveShopReviewServcie: DiveShopReviewService) {}

  @ApiOkResponse({
    type: ListResDto<DiveShopReviewInListResDto>,
    description: '다이브샵 리뷰 목록 조회',
  })
  @Get('/list')
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
  @Post('/create')
  async createReview(
    @Param('shopId') shopId: number,
    @Body() createReviewBody: CreateDiveShopReviewReqDto,
  ) {
    return this.diveShopReviewServcie.createReview(shopId, createReviewBody);
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 수정',
  })
  @Patch('/:reviewId/modify')
  async modifyReview(
    @Param('shopId') shopId: number,
    @Param('reviewId') reviewId: number,
    @Body() modifyReviewBody,
  ) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '다이브샵 리뷰 삭제',
  })
  @Delete('/:reviewId/remove')
  async removeReview(
    @Param('shopId') shopId: number,
    @Param('reviewId') reviewId: number,
  ) {}
}
