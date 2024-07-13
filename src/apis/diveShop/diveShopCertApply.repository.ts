import { Injectable } from '@nestjs/common';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import DiveShopCertApply from 'src/entities/DiveShopCertApply';
import {
  DataSource,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CertApplicationInListResDto } from './dtos/certApplicationInListRes.dto';

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
}
