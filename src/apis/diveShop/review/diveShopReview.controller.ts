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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { DiveShopReviewService } from '@/apis/diveShop/review/diveShopReview.service';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { DiveShopReviewResDto } from '@/apis/diveShop/review/dtos/diveShopReviewRes.dto';
import { Current } from '@/common/decorators/current';
import { Roles } from '@/common/decorators/roles';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { Role } from '@/common/enums';

@ApiTags('DiveShopReview')
@ApiBearerAuth('accessToken')
@UseGuards(AuthRoleGuard)
@Controller('')
export class DiveShopReviewController {
  constructor(private readonly diveShopReviewServcie: DiveShopReviewService) {}

  @Get('/list')
  @ApiOperation({ description: '다이빙 샵 리뷰 목록 조회 API' })
  @ApiOkResponse({
    type: ListResDto<DiveShopReviewResDto>,
    description: '다이빙 샵 리뷰 목록',
  })
  async getDiveShopReviewListByDiveShop(
    @Param('shopId') shopId: number,
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DiveShopReviewResDto>> {
    const { page, pagingCount } = paginationForm;

    return this.diveShopReviewServcie.getDiveShopReviewListByDiveShop(
      shopId,
      page,
      pagingCount,
    );
  }

  @Get('/list/user')
  @ApiOperation({ description: '유저가 작성한 다이빙 샵 리뷰 목록 조회 API' })
  @ApiOkResponse({
    type: ListResDto<DiveShopReviewResDto>,
    description: '다이빙 샵 리뷰 목록',
  })
  async getDiveShopReviewListByUser(
    @Query('id') userHandle: string,
    @Query() paginationForm: PaginationReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<ListResDto<DiveShopReviewResDto>> {
    const { handle } = cur;
    const { page, pagingCount } = paginationForm;

    return this.diveShopReviewServcie.getDiveShopReviewListByUser(
      userHandle,
      page,
      pagingCount,
      handle == userHandle,
    );
  }

  @Post('/:shopId')
  @Roles([Role.USER, Role.ADMIN])
  @ApiOperation({ description: '다이빙 샵 리뷰 작성 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '작성 성공',
  })
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

  @Patch('/:reviewId')
  @Roles([Role.USER, Role.ADMIN])
  @ApiOperation({ description: '다이빙 샵 리뷰 수정 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '수정 성공',
  })
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

  @Delete('/:reviewId')
  @Roles([Role.USER, Role.ADMIN])
  @ApiOperation({ description: '다이빙 샵 리뷰 삭제 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '삭제 성공',
  })
  async removeDiveShopReview(
    // @Param('shopId') shopId: number,
    @Param('reviewId') reviewId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveShopReviewServcie.removeDiveShopReview(reviewId, userId);
  }

  @Patch('/:reviewId/recommend')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이빙 샵 리뷰 추천 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '추천/추천 취소 성공',
  })
  async recommendDiveShopReview(
    @Param('reviewId') reviewId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;

    return this.diveShopReviewServcie.recommendDiveShopReview(reviewId, userId);
  }
}
