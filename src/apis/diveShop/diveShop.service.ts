import { Injectable } from '@nestjs/common';
import { DiveShopRepository } from './diveShop.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopInListResDto } from './dtos/diveShopInListRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { DiveShopResDto } from './dtos/diveShopRes.dto';
import { throwErr } from 'src/common/utils/errorHandler';

@Injectable()
export class DiveShopService {
  constructor(private readonly diveShopRepository: DiveShopRepository) {}

  async getDiveShopList(
    pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    const { page, pagingCount } = pagination;

    return this.diveShopRepository.findDiveShopListAndCount(page, pagingCount);
  }

  async getDiveShop(shopId: number): Promise<DiveShopResDto> {
    return this.diveShopRepository
      .findOneOrFail({ where: { id: shopId } })
      .catch(() => throwErr('NO_DVIESHOP'));
  }

  // async getMyDiveShop(shopId: number) {}
}
