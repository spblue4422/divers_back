import { Injectable } from '@nestjs/common';
import { UserRepostiory } from './user.repository';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { MyProfileResDto } from './dtos/myProfileRes.dto';
import { modifyUserProfileReqDto } from './dtos/modifyUserProfileReq.dto';
import { throwErr } from 'src/common/utils/errorHandler';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepostiory) {}

  async getUserProfileById(userId: number): Promise<UserProfileResDto> {
    const userProfile = await this.userRepository.getProfile(userId);

    return UserProfileResDto.makeRes(userProfile);
  }

  async getMyProfile(userId: number): Promise<MyProfileResDto> {
    const userProfile = await this.userRepository.getProfile(userId);

    return MyProfileResDto.makeRes(userProfile);
  }

  async modifyUser(userId: number, modifyUserBody: modifyUserProfileReqDto) {
    const userData = await this.userRepository.findOneBy({ id: userId });
    if (!userData) throwErr('NO_USER');

    //혹시 모르니 로직 넣어둘까.
    const { nickname } = modifyUserBody;
    if (await this.userRepository.checkNicknameDup(nickname))
      throwErr('DUPLICATE_NICKNAME');

    await this.userRepository.save({
      nickname,
      ...userData,
    });

    return MsgResDto.success();
  }

  async dupCheckNickname(nickname: string) {
    if (await this.userRepository.checkNicknameDup(nickname))
      throwErr('DUPLICATE_NICKNAME');

    return MsgResDto.success();
  }
}
