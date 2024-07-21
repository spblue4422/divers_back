import { Injectable } from '@nestjs/common';
import { DiversException } from 'src/common/exceptions';
import { Auth } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends Repository<Auth> {
  constructor(private dataSource: DataSource) {
    super(Auth, dataSource.createEntityManager());
  }

  async findOneByLoginIdOrFail(loginId: string): Promise<Auth> {
    return this.findOneOrFail({
      where: { loginId },
      // relations: { user: true },
      relations: ['user'],
    }).catch(() => {
      throw new DiversException('WRONG_ID_PW');
    });
  }
}
