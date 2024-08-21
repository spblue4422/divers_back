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

import { CreateDivePointReviewReqDto } from './dtos/createDivePointReviewReq.dto';
import { DivePointReviewResDto } from './dtos/divePointReviewRes.dto';
import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { DivePointReviewService } from '@/apis/divePoint/review/divePointReview.service';
import { ModifyDivePointReviewReqDto } from '@/apis/divePoint/review/dtos/modifyDivePointReviewReq.dto';
import { CreateDiveShopReviewReqDto } from '@/apis/diveShop/review/dtos/createDiveShopReviewReq.dto';
import { Current } from '@/common/decorators/current';
import { Roles } from '@/common/decorators/roles';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { Role } from '@/common/enums';

@ApiTags('DivePointReview')
@ApiBearerAuth('accessToken')
@UseGuards(AuthRoleGuard)
@Controller()
export class DivePointReviewController {
  constructor(
    private readonly divePointReviewService: DivePointReviewService,
  ) {}

  @Get('/list')
  @Roles([Role.USER, Role.SHOP, Role.ADMIN])
  @ApiOperation({ description: '다이빙 포인트 리뷰 목록 조회 API' })
  @ApiOkResponse({
    description: '다이빙 포인트 리뷰 목록',
  })
  async getDivePointReviewListByDivePoint(
    @Param('pointId') pointId: number,
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    const { page, pagingCount } = paginationForm;

    return this.divePointReviewService.getDivePointReviewListByDivePoint(
      pointId,
      page,
      pagingCount,
    );
  }

  @Get('list/user')
  @Roles([Role.USER, Role.ADMIN])
  @ApiOperation({
    description: '유저가 작성한 다이빙 포인트 리뷰 목록 조회 API',
  })
  @ApiOkResponse({
    type: ListResDto<DivePointReviewResDto>,
    description: '다이빙 포인트 리뷰 목록',
  })
  async getDivePointReviewListByUser(
    @Query('id') userHandle: string,
    @Query() paginationForm: PaginationReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<ListResDto<DivePointReviewResDto>> {
    const { handle } = cur;
    const { page, pagingCount } = paginationForm;

    return this.divePointReviewService.getDivePointReviewListByUser(
      userHandle,
      page,
      pagingCount,
      handle == userHandle,
    );
  }

  @Post()
  @Roles([Role.USER, Role.ADMIN])
  @ApiOperation({ description: '다이빙 포인트 리뷰 작성 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '작성 성공',
  })
  async createDivePointReview(
    @Body() createDivePointReviewBody: CreateDivePointReviewReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;

    return this.divePointReviewService.createDivePointReview(
      createDivePointReviewBody,
      userId,
    );
  }

  @Patch()
  @Roles([Role.USER, Role.ADMIN])
  @ApiOperation({ description: '다이빙 포인트 리뷰 수정 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '수정 성공',
  })
  async modifyDivePointReview(
    @Param('reviewId') reviewId: number,
    @Body() modifyDivePointReviewBody: ModifyDivePointReviewReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.divePointReviewService.modifyDivePointReview(
      reviewId,
      modifyDivePointReviewBody,
      userId,
    );
  }

  @Delete()
  @Roles([Role.USER, Role.ADMIN])
  @ApiOperation({ description: '다이빙 포인트 리뷰 삭제 API' })
  @ApiOkResponse({
    type: MsgResDto,
    description: '삭제 성공',
  })
  async removeDivePointReview(
    @Param('reviewId') reviewId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { keyId: userId } = cur;
  }

  @Patch()
  @Roles([Role.USER])
  @ApiOperation({ description: '다이빙 포인트 리뷰 추천 API' })
  @ApiOkResponse({ type: MsgResDto, description: '추천/추천 취소 성공' })
  async recommendDivePointReview(
    @Param('reviewId') reviewId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.divePointReviewService.recommendDivePointReview(
      reviewId,
      userId,
    );
  }
}
