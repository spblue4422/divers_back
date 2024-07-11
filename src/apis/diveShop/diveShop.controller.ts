import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DiveShopService } from './diveShop.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopInListResDto } from './dtos/diveShopInListRes.dto';
import { DiveShopResDto } from './dtos/diveShopRes.dto';
import { ModifyDiveShopReqDto } from './dtos/modifyDiveShopReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';

@Controller('diveShop')
export class DiveShopController {
  constructor(private readonly diveShopService: DiveShopService) {}

  @Get('/list')
  @ApiOkResponse({
    type: ListResDto<DiveShopInListResDto>,
    description: '다이브샵 목록 조회',
  })
  async getDiveShopList(
    @Query() pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    return this.diveShopService.getDiveShopList(pagination);
  }

  @Get('/:shopId')
  @ApiOkResponse({
    type: DiveShopResDto,
    description: '다이브샵 상세정보 조회',
  })
  async getDiveShopById(
    @Param('shopId') shopId: number,
  ): Promise<DiveShopResDto> {
    return this.diveShopService.getDiveShop(shopId);
  }

  @Patch('/:shopId/recommend')
  @ApiOkResponse({ type: MsgResDto, description: '다이브샵 추천' })
  async recommendDiveShop(@Param('shopId') shopId: number): Promise<MsgResDto> {
    return this.diveShopService.recommedShop(shopId, shopId);
  }

  @Patch('/:shopId/modify')
  @ApiOkResponse({ description: '다이브샵 정보 수정' })
  async modifyDiveShopProfile(
    @Param('shopId') shopId: number,
    @Body() modifyDiveShopBody: ModifyDiveShopReqDto,
  ): Promise<MsgResDto> {
    return this.diveShopService.modifyDiveShop(shopId, modifyDiveShopBody);
  }

  @Post('/:shopId/cert')
  @ApiOkResponse({ description: '다이브샵 인증 신청' })
  async applyCertDiveShop() {
    // 주요 로직 - 신청서 생성, 만약 반려당한 신청서가 3장 이상이면 신청 불가
  }

  //어드민용 생성, 삭제 있어야 할듯
}
