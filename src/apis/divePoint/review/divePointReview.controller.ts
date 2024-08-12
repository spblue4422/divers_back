import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { DivePointReviewService } from '@/apis/divePoint/review/divePointReview.service';
import { MsgResDto } from '@/common/dtos/msgRes.dto';

@Controller()
export class DivePointReviewController {
  constructor(
    private readonly divePointReviewService: DivePointReviewService,
  ) {}

  @ApiOkResponse({
    description: '포인트 리뷰 목록 조회',
  })
  @Get()
  async getReviewListByPointId() {}

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
