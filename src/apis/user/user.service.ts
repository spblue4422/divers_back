import { Injectable } from '@nestjs/common';
import { UserRepostiory } from './user.repository';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { MyProfileResDto } from './dtos/myProfileRes.dto';
import { ChangeUserProfileReqDto } from './dtos/changeUserProfileReq.dto';
import { throwErr } from 'src/common/utils/errorHandler';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { CreateUserReqDto } from './dtos/createUserReq.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepostiory) {}

  async getUserProfileById(userId: number): Promise<UserProfileResDto> {
    const userProfile = await this.userRepository.findOneByUserId(userId);

    return UserProfileResDto.makeRes(userProfile);
  }

  async getMyProfile(userId: number): Promise<MyProfileResDto> {
    const userProfile = await this.userRepository.findOneByUserId(userId);

    return MyProfileResDto.makeRes(userProfile);
  }

  async createUser(
    authId: number,
    createUserBody: CreateUserReqDto,
  ): Promise<MsgResDto> {
    const { nickname } = createUserBody;

    if (await this.userRepository.checkNicknameDup(nickname))
      throwErr('DUPLICATE_NICKNAME');

    await this.userRepository.insert({
      authId,
      ...createUserBody,
    });

    return MsgResDto.success();
  }

  // 조금 이따가 수정
  async changeUser(userId: number, changeProfileBody: ChangeUserProfileReqDto) {
    const user = await this.userRepository.findOneByUserId(userId);

    //혹시 모르니 로직 넣어둘까.
    const { nickname } = changeProfileBody;
    if (await this.userRepository.checkNicknameDup(nickname))
      throwErr('DUPLICATE_NICKNAME');

    await this.userRepository.save({
      nickname,
      ...user,
    });

    return MsgResDto.success();
  }

  async dupCheckNickname(nickname: string) {
    if (await this.userRepository.checkNicknameDup(nickname))
      throwErr('DUPLICATE_NICKNAME');

    return MsgResDto.success();
  }
}
