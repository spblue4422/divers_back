import { InsertResult } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiveShopRepository } from '@/apis/diveShop/diveShop.repository';
import { DiveShopCertApplyRepository } from '@/apis/diveShop/diveShopCertApply.repository';
import { CertApplicationResDto } from '@/apis/diveShop/dtos/certApplicationRes.dto';
import { CreateDiveShopReqDto } from '@/apis/diveShop/dtos/createDiveShopReqDto';
import { DiveShopInListResDto } from '@/apis/diveShop/dtos/diveShopInListRes.dto';
import { DiveShopResDto } from '@/apis/diveShop/dtos/diveShopRes.dto';
import { ModifyDiveShopReqDto } from '@/apis/diveShop/dtos/modifyDiveShopReq.dto';
import { RecommendationService } from '@/apis/recommendation/recommendation.service';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { DiversException } from '@/common/exceptions';

@Injectable()
export class DiveShopService {
  constructor(
    private readonly diveShopRepository: DiveShopRepository,
    private readonly diveShopCertApplyRepository: DiveShopCertApplyRepository,
    private readonly recommendationService: RecommendationService,
  ) {}

  async getDiveShopList(
    page: number,
    pagingCount: number,
  ): Promise<ListResDto<DiveShopInListResDto>> {
    return this.diveShopRepository.findListWithCount(page, pagingCount);
  }

  async getDiveShop(shopId: number): Promise<DiveShopResDto> {
    return this.diveShopRepository.findOneByShopId(shopId);
  }

  /*
  async getMyDiveShop(myshop: number): Promise<DiveShopResDto> {
    return this.diveShopRepository.findByIdOrFail(myshop);
  }
    */

  // 트랜잭션 필요
  async recommedDiveShop(shopId: number, userId: number): Promise<MsgResDto> {
    const { recommendation } =
      await this.diveShopRepository.findOneByShopId(shopId);

    const recommendOrCancel = await this.recommendationService.recommendTarget(
      userId,
      'DIVESHOP',
      shopId,
    );

    await this.diveShopRepository.update(
      { id: shopId },
      { recommendation: recommendation + (recommendOrCancel ? 1 : -1) },
    );

    return MsgResDto.success();
  }

  /*
  async createDiveshop(
    authId: number,
    createDiveShopBody: CreateDiveShopReqDto,
  ): Promise<MsgResDto> {
    const result: InsertResult = await this.diveShopRepository.insert({
      authId,
      ...createDiveShopBody,
    });

    await this.applyCertDiveShop(result.identifiers[0].id);

    return MsgResDto.success();
  }
    */

  async modifyDiveShop(
    shopId: number,
    modifyDiveShopBody: ModifyDiveShopReqDto,
  ): Promise<MsgResDto> {
    await this.diveShopRepository.findOneByShopId(shopId);

    await this.diveShopRepository.update(
      { id: shopId },
      { ...modifyDiveShopBody },
    );

    return MsgResDto.success();
  }

  async removeDiveShop(shopId: number): Promise<MsgResDto> {
    await this.diveShopRepository.softRemove({ id: shopId }).catch(() => {
      throw new DiversException('NO_DIVESHOP');
    });

    return MsgResDto.success();
  }

  async applyCertDiveShop(shopId: number): Promise<MsgResDto> {
    const { dataList, totalCount } =
      await this.diveShopCertApplyRepository.findListWithCount(1, 5, {
        shopId,
        approvedDate: null,
        rejectedDate: null,
      });

    // 심사중인 신청서가 이미 있는 경우
    if (dataList.length != 0)
      throw new DiversException('ALREADY_APPLIED_DIVESHOP');
    // 이미 신청을 3번이나 실패한 경우
    if (totalCount > 2)
      throw new DiversException('REJECTED_THREE_TIMES_DIVESHOP');

    await this.diveShopCertApplyRepository.insert({
      shopId,
    });

    return MsgResDto.success();
  }

  async getCertApplication(
    certId: number,
    shopId: number,
  ): Promise<CertApplicationResDto> {
    return this.diveShopCertApplyRepository.findByIdOrFail(certId, shopId);
  }
}
