import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiversException } from '@/common/exceptions';
import { User } from '@/entities/index';

@Injectable()
export class UserRepostiory extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneByAuthId(authId: number) {
    return this.findOneOrFail({
      where: { authId },
    });
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
}
