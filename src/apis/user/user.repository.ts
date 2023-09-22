import { Injectable } from '@nestjs/common';
import User from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepostiory extends Repository<User> {
  async getProfile(userId: number) {
    return this.findOne({
      where: {
        id: userId,
        isBanned: false,
        // deletedAt: null,
      },
      withDeleted: true,
    });
  }

  async checkNicknameDup(nickname: string) {
    // return this.find({ where: { nickname } });
    return this.exist({ where: { nickname } });
  }
}
