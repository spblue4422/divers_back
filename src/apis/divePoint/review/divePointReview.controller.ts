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

import { DivePointReviewResDto } from './dtos/divePointReviewRes.dto';
import { AuthGuard } from '@/apis/auth/guards/auth.guard';
import { DivePointReviewService } from '@/apis/divePoint/review/divePointReview.service';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';

@Controller()
@UseGuards(AuthGuard)
export class DivePointReviewController {
  constructor(
    private readonly divePointReviewService: DivePointReviewService,
  ) {}

  @ApiOkResponse({
    description: '다이빙 포인트의 리뷰 목록 조회',
  })
  @Get('/list')
  async getReviewListByPointId(
    @Param('pointId') pointId: number,
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    const { page, pagingCount } = paginationForm;

    return this.divePointReviewService.getDivePointReviewListByPointId(
      pointId,
      page,
      pagingCount,
    );
  }

  @ApiOkResponse({
    description: '유저가 작성한 다이빙 포인트 리뷰 목록 조회',
  })
  @Get('list/user/:userId')
  async getReviewListByUserId(
    @Param('userId') userId: number,
    @Query() paginationForm: PaginationReqDto,
  ) {
    // 본인 껀지 확인하는 로직을 추가합시당
    const { page, pagingCount } = paginationForm;

    return this.divePointReviewService.getDivePointReviewListByUserId(
      userId,
      page,
      pagingCount,
    );
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '포인트 리뷰 생성',
  })
  @Post()
  async createReview(@Body() createReviewBody) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '포인트 리뷰 수정',
  })
  @Patch()
  async modifyReview(
    @Param('reviewId') reviewId: number,
    @Body() modifyReviewBody,
  ) {}

  @ApiOkResponse({
    type: MsgResDto,
    description: '포인트 리뷰 삭제',
  })
  @Delete()
  async deleteReview(@Param('reviewId') reviewId: number) {}
}
