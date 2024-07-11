import { Injectable } from '@nestjs/common';
import { throwErr } from 'src/common/utils/errorHandler';
import Auth from 'src/entities/Auth';
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
    }).catch(() => throwErr('WRONG_ID_PW'));
  }
}
