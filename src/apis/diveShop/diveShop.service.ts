import { Injectable } from '@nestjs/common';
import { DiveShopRepository } from './diveShop.repository';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveShopInListResDto } from './dtos/diveShopInListRes.dto';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { DiveShopResDto } from './dtos/diveShopRes.dto';
import { RecommendationService } from '../recommendation/recommednation.service';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { ModifyDiveShopReqDto } from './dtos/modifyDiveShopReq.dto';
import { throwErr } from 'src/common/utils/errorHandler';
import { CreateDiveShopReqDto } from './dtos/createDiveShopReqDto';
import { DiveShopCertApplyRepository } from './diveShopCertApply.repository';
import { InsertResult } from 'typeorm';
import { CertApplicationResDto } from './dtos/certApplicationRes.dto';

@Injectable()
export class DiveShopService {
  constructor(
    private readonly diveShopRepository: DiveShopRepository,
    private readonly diveShopCertApplyRepository: DiveShopCertApplyRepository,
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

  async getMyDiveShop(myshop: number): Promise<DiveShopResDto> {
    return this.diveShopRepository.findByIdOrFail(myshop);
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

  async removeDiveShop(shopId: number): Promise<MsgResDto> {
    await this.diveShopRepository
      .softRemove({ id: shopId })
      .catch(() => throwErr('NO_DIVESHOP'));

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
    if (dataList.length != 0) throwErr('ALREADY_APPLIED_DIVESHOP');
    // 이미 신청을 3번이나 실패한 경우
    if (totalCount > 2) throwErr('REJECTED_THREE_TIMES_DIVESHOP');

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
