import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { DiveShopService } from './diveShop.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopInListResDto } from './dtos/diveShopInListRes.dto';
import { DiveShopResDto } from './dtos/diveShopRes.dto';
import { ModifyDiveShopReqDto } from './dtos/modifyDiveShopReq.dto';

@Controller('diveShop')
export class DiveShopController {
  constructor(private readonly diveShopService: DiveShopService) {}

  @Get('/list')
  @ApiOkResponse()
  async getDiveShopList(
    @Query() pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    return this.diveShopService.getDiveShopList(pagination);
  }

  @Get('/:shopId')
  @ApiOkResponse()
  async getDiveShop(@Param('shopId') shopId: number): Promise<DiveShopResDto> {
    return this.diveShopService.getDiveShop(shopId);
  }

  @Patch('/modify/:shopId')
  @ApiOkResponse()
  async modifyDiveShop(
    @Param('shopId') shopId: number,
    @Body() modifyDiveShopBody: ModifyDiveShopReqDto,
  ) {}

  //어드민용 생성, 삭제 있어야 할듯
}
