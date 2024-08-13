import { DataSource, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiversException } from '@/common/exceptions';
import { UpdateCriteria } from '@/common/types';
import { Auth } from '@/entities/index';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class AuthRepository extends Repository<Auth> {
  constructor(private dataSource: DataSource) {
    super(Auth, dataSource.createEntityManager());
  }

  async findOneByLoginId(loginId: string): Promise<Auth> {
    return this.findOneOrFail({
      where: { loginId },
    }).catch(() => {
      throw new DiversException('WRONG_ID_PW');
    });
  }

  async findOneByHandle(handle: string): Promise<Auth> {
    return this.findOneOrFail({
      where: { handle },
    }).catch(() => {
      throw new DiversException('NO_AUTH');
    });
  }

  async updateAndCatchFail(
    where: UpdateCriteria<Auth>,
    target: QueryDeepPartialEntity<Auth>,
  ): Promise<UpdateResult> {
    return this.update(where, target).catch(() => {
      throw new DiversException('NO_AUTH');
    });
  }
}
