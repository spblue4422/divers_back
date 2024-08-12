import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';

import { CertApplicationInListResDto } from '@/apis/diveShop/dtos/certApplicationInListRes.dto';
import { CertApplicationResDto } from '@/apis/diveShop/dtos/certApplicationRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { DiversException } from '@/common/exceptions';
import { DiveShopCertApply } from '@/entities/index';

@Injectable()
export class DiveShopCertApplyRepository extends Repository<DiveShopCertApply> {
  constructor(private dataSource: DataSource) {
    super(DiveShopCertApply, dataSource.createEntityManager());
  }

  async findListWithCount(
    page: number,
    pagingCount: number,
    where?: FindOptionsWhere<DiveShopCertApply>,
    order?: FindOptionsOrder<DiveShopCertApply>,
  ): Promise<ListResDto<CertApplicationInListResDto>> {
    return this.findAndCount({
      where,
      order,
      skip: page - 1,
      take: pagingCount,
      //relations: { diveShop: true },
      relations: ['diveShop'],
    }).then(([data, count]) => ({
      dataList: data.map((d) => CertApplicationInListResDto.makeRes(d)),
      totalCount: count,
    }));
  }

  async findByIdOrFail(
    certId: number,
    shopId: number,
  ): Promise<CertApplicationResDto> {
    return this.findOneOrFail({ where: { id: certId, shopId } })
      .then((d) => CertApplicationResDto.makeRes(d))
      .catch(() => {
        throw new DiversException('NO_CERT_APPLY');
      });
  }
}
