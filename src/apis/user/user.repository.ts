import { Injectable } from '@nestjs/common';
import { throwErr } from 'src/common/utils/errorHandler';
import User from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepostiory extends Repository<User> {
  async findOneByUserId(userId: number) {
    return this.findOneOrFail({
      where: {
        id: userId,
      },
    }).catch(() => throwErr('NO_USER'));
  }

  async checkNicknameDup(nickname: string) {
    return this.exist({ where: { nickname } });
  }
}
