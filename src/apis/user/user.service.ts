import { Injectable } from '@nestjs/common';
import { UserRepostiory } from './user.repository';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { MyProfileResDto } from './dtos/myProfileRes.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepostiory) {}

  async getUserProfileById(userId: number): Promise<UserProfileResDto> {
    const userProfile = await this.userRepository.findOneBy({
      id: userId,
      isBanned: false,
      deletedAt: null,
    });

    return UserProfileResDto.makeRes(userProfile);
  }

  async getMyProfile(userId: number): Promise<MyProfileResDto> {
    const userProfile = await this.userRepository.findOneBy({
      id: userId,
      isBanned: false,
      deletedAt: null,
    });

    return MyProfileResDto.makeRes(userProfile);
  }
}
