import { Injectable } from '@nestjs/common';
import { DiveShopRepository } from './diveShop.repository';
import { ListAndCountResDto } from 'src/common/dtos/listtAndCountRes.dto';
import DiveShop from 'src/entities/DiveShop';

@Injectable()
export class DiveShopService {
  constructor(private readonly diveShopRepository: DiveShopRepository) {}

  async getDiveShopList(): Promise<ListAndCountResDto<DiveShop>> {
    return this.diveShopRepository
      .findAndCountBy({ deletedAt: null })
      .then(([data, count]) => ({ dataList: data, totalCount: count }));
  }

  async getOneDiveShop(shopId: number) {
    return this.diveShopRepository.findOneByOrFail({
      id: shopId,
      deletedAt: null,
    });
  }

  // async getMyDiveShop(shopId: number) {}
}
