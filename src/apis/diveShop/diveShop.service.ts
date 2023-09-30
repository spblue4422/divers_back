import { Injectable } from '@nestjs/common';
import { DiveShopRepository } from './diveShop.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopInListResDto } from './dtos/diveShopInListRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { DiveShopResDto } from './dtos/diveShopRes.dto';

@Injectable()
export class DiveShopService {
  constructor(private readonly diveShopRepository: DiveShopRepository) {}

  async getDiveShopList(
    pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    const { page, pagingCount } = pagination;

    return this.diveShopRepository.findListWithCount(page, pagingCount);
  }

  async getDiveShop(shopId: number): Promise<DiveShopResDto> {
    return this.diveShopRepository.findByIdOrFail(shopId);
  }

  // 트랜잭션 필요
  async recommed(shopId: number) {
    const diveShop = await this.diveShopRepository.findByIdOrFail(shopId);

    // const
  }

  // async getMyDiveShop(shopId: number) {}
}
