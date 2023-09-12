import { Injectable } from '@nestjs/common';
import User from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepostiory extends Repository<User> {
  async getOne(userId: number) {
    this.findOne({ where: { id: userId } });
  }
}
