import { Injectable } from '@nestjs/common';
import { UserRepostiory } from '../user/user.repository';
import { DiveShopRepository } from '../diveShop/diveShop.repository';
import { DivePointRepostiory } from '../divePoint/divePoint.repository';
import { DiveLogRepository } from '../diveLog/diveLog.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly userRepository: UserRepostiory,
    private readonly diveShopRepository: DiveShopRepository,
    private readonly divePointRepostiory: DivePointRepostiory,
    private readonly diveLogRepository: DiveLogRepository,
  ) {}

  async searchUser() {}

  async searchShop() {}

  async searchPoint() {}

  async searchLog() {}
}
