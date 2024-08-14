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
import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { DivePointReviewService } from '@/apis/divePoint/review/divePointReview.service';
import { Current } from '@/common/decorators/current';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';

@UseGuards(AuthRoleGuard)
@Controller()
export class DivePointReviewController {
  constructor(
    private readonly divePointReviewService: DivePointReviewService,
  ) {}

  @ApiOkResponse({
    description: '다이빙 포인트 리뷰 목록 조회',
  })
  @Get('/list')
  async getPointReviewListByPointId(
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

  @Get('list/user')
  @ApiOkResponse({
    type: ListResDto<DivePointReviewResDto>,
    description: '유저가 작성한 다이빙 포인트 리뷰 목록 조회',
  })
  async getUserPointReviewList(
    @Query('user') userHandle: string,
    @Query() paginationForm: PaginationReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    const { handle } = cur;
    const { page, pagingCount } = paginationForm;

    return this.divePointReviewService.getDivePointReviewListByHandle(
      userHandle,
      page,
      pagingCount,
      handle == userHandle,
    );
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '포인트 리뷰 생성',
  })
  @Post()
  async createReview(
    @Body() createReviewBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId } = cur;
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '포인트 리뷰 수정',
  })
  @Patch()
  async modifyReview(
    @Param('reviewId') reviewId: number,
    @Body() modifyReviewBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId } = cur;
  }

  @ApiOkResponse({
    type: MsgResDto,
    description: '포인트 리뷰 삭제',
  })
  @Delete()
  async deleteReview(
    @Param('reviewId') reviewId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId } = cur;
  }
}
