import { Controller } from '@nestjs/common';
import { DiveShopService } from './diveShop.service';

@Controller('diveShop')
export class DiveShopController {
  constructor(private readonly diveShopService: DiveShopService) {}

  async getDiveShopList() {
    return this.diveShopService.getDiveShopList();
  }
}
