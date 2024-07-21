import { Injectable } from '@nestjs/common';
import { DiversException } from 'src/common/exceptions';
import { User } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

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
