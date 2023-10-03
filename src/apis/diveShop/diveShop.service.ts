import { Injectable } from '@nestjs/common';
import { DiveShopRepository } from './diveShop.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopInListResDto } from './dtos/diveShopInListRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { DiveShopResDto } from './dtos/diveShopRes.dto';
import { RecommendationService } from '../recommendation/recommednation.service';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { ModifyDiveShopReqDto } from './dtos/modifyDiveShopReq.dto';

@Injectable()
export class DiveShopService {
  constructor(
    private readonly diveShopRepository: DiveShopRepository,
    private readonly recommendationService: RecommendationService,
  ) {}

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
  async recommedShop(userId: number, shopId: number) {
    const { recommendation } =
      await this.diveShopRepository.findByIdOrFail(shopId);

    await this.recommendationService.recommendTarget(
      userId,
      shopId,
      'DIVESHOP',
    );

    await this.diveShopRepository.update(
      { id: shopId },
      { recommendation: recommendation + 1 },
    );

    return MsgResDto.success();
  }

  async modifyDiveShop(
    shopId: number,
    modifyDiveShopBody: ModifyDiveShopReqDto,
  ): Promise<MsgResDto> {
    await this.diveShopRepository.findByIdOrFail(shopId);

    await this.diveShopRepository.update(
      { id: shopId },
      { ...modifyDiveShopBody },
    );

    return MsgResDto.success();
  }
  // async getMyDiveShop(shopId: number) {}
}
