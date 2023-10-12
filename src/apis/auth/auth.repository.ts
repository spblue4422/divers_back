import { Injectable } from '@nestjs/common';
import { throwErr } from 'src/common/utils/errorHandler';
import AuthDiveShop from 'src/entities/AuthDiveShop';
import AuthUser from 'src/entities/AuthUser';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUserRepository extends Repository<AuthUser> {
  async findOneByLoginIdOrFail(loginId: string): Promise<AuthUser> {
    return this.findOneOrFail({
      where: { loginId },
      // relations: { user: true },
      relations: ['user'],
    }).catch(() => throwErr('WRONG_ID_PW'));
  }
}

@Injectable()
export class AuthShopRepository extends Repository<AuthDiveShop> {}
