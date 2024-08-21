import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
import { DiveShopService } from '@/apis/diveShop/diveShop.service';
import { DiveShopInListResDto } from '@/apis/diveShop/dtos/diveShopInListRes.dto';
import { DiveShopResDto } from '@/apis/diveShop/dtos/diveShopRes.dto';
import { ModifyDiveShopReqDto } from '@/apis/diveShop/dtos/modifyDiveShopReq.dto';
import { Current } from '@/common/decorators/current';
import { Roles } from '@/common/decorators/roles';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { Role } from '@/common/enums';

@ApiTags('DiveShop')
@ApiBearerAuth('accessToken')
@UseGuards(AuthRoleGuard)
@Controller('shop')
export class DiveShopController {
  constructor(private readonly diveShopService: DiveShopService) {}

  @Get('/list')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이빙 샵 목록 조회 API' })
  @ApiOkResponse({
    type: ListResDto<DiveShopInListResDto>,
    description: '다이빙 샵 목록',
  })
  async getDiveShopList(
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    const { page, pagingCount } = paginationForm;

    return this.diveShopService.getDiveShopList(page, pagingCount);
  }

  @Get('/:shopId')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이빙 샵 상세 정보 조회 API' })
  @ApiOkResponse({
    type: DiveShopResDto,
    description: '다이빙 샵 정보',
  })
  async getDiveShopById(
    @Param('shopId') shopId: number,
  ): Promise<DiveShopResDto> {
    return this.diveShopService.getDiveShop(shopId);
  }

  @Patch('/:shopId/recommend')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이빙 샵 추천 API' })
  @ApiOkResponse({ type: MsgResDto, description: '추천/추천 취소 성공' })
  async recommendDiveShop(
    @Param('shopId') shopId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.diveShopService.recommedDiveShop(shopId, userId);
  }

  // 다이브샵 정보도 생각해보면 사장 맘대로 수정하면 안되지 않을까? 세부적인 로직은 좀 더 고민해봐야할듯
  /*
  @Patch('/:shopId/modify')
  @ApiOkResponse({ description: '다이브샵 정보 수정' })
  async modifyDiveShopProfile(
    @Param('shopId') shopId: number,
    @Body() modifyDiveShopBody: ModifyDiveShopReqDto,
  ): Promise<MsgResDto> {
    return this.diveShopService.modifyDiveShop(shopId, modifyDiveShopBody);
  }

  @Get('/:shopId/certificate')
  @ApiOkResponse({ description: '다이브샵 인증 신청' })
  async applyCertDiveShop(@Param('shopId') shopId: number): Promise<MsgResDto> {
    // 주요 로직 - 인증 신청 생성, 만약 이미 심사중인 신청이 존재하거나 반려당한 신청이 3개 이상이면 신청 불가
    return this.diveShopService.applyCertDiveShop(shopId);
  }*/

  //어드민용 생성, 삭제 있어야 할듯
}
