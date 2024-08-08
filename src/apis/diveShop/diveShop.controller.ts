import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
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
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    return this.diveShopService.getDiveShopList(paginationForm);
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
  async recommendDiveShop(
    @Param('shopId') shopId: number,
    userId: number,
  ): Promise<MsgResDto> {
    return this.diveShopService.recommedShop(shopId, userId);
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
