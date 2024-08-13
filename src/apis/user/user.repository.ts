import { DataSource, Repository, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiversException } from '@/common/exceptions';
import { UpdateCriteria } from '@/common/types';
import { User } from '@/entities/index';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserRepostiory extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneByUserId(userId: number) {
    return this.findOneOrFail({
      where: {
        id: userId,
      },
    }).catch(() => {
      throw new DiversException('NO_USER');
    });
  }

  async findOneByAuthHandle(handle: string): Promise<User> {
    return this.findOneOrFail({
      where: {
        authHandle: handle ?? '',
      },
    }).catch(() => {
      throw new DiversException('NO_USER');
    });
  }

  async updateAndCatchFail(
    where: UpdateCriteria<User>,
    target: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    return this.update(where, target).catch(() => {
      throw new DiversException('NO_USER');
    });
  }
}
