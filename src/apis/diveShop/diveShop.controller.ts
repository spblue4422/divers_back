import { Controller, Get, Param } from '@nestjs/common';
import { DiveShopService } from './diveShop.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('diveShop')
export class DiveShopController {
  constructor(private readonly diveShopService: DiveShopService) {}

  @Get('/list')
  async getDiveShopList() {
    return this.diveShopService.getDiveShopList();
  }

  @ApiOkResponse()
  @Get('/:shopId')
  async getDiveShop(@Param() shopId: number) {
    return this.diveShopService.getDiveShop(shopId);
  }
}
