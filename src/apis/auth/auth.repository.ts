import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DiversException } from '@/common/exceptions';
import { Auth } from '@/entities/index';

@Injectable()
export class AuthRepository extends Repository<Auth> {
  constructor(private dataSource: DataSource) {
    super(Auth, dataSource.createEntityManager());
  }

  async findOneByLoginIdOrFail(loginId: string): Promise<Auth> {
    return this.findOneOrFail({
      where: { loginId },
    }).catch(() => {
      throw new DiversException('WRONG_ID_PW');
    });
  }
}
