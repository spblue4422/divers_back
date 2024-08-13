import { Injectable } from '@nestjs/common';

import { ChangeUserProfileReqDto } from '@/apis/user/dtos/changeUserProfileReq.dto';
import { CreateUserReqDto } from '@/apis/user/dtos/createUserReq.dto';
import { MyProfileResDto } from '@/apis/user/dtos/myProfileRes.dto';
import { UserProfileResDto } from '@/apis/user/dtos/userProfileRes.dto';
import { UserRepostiory } from '@/apis/user/user.repository';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { DiversException } from '@/common/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepostiory) {}

  async getUserProfileById(
    userId: number,
    owner: boolean,
  ): Promise<MyProfileResDto | UserProfileResDto> {
    return this.userRepository
      .findOneByUserId(userId)
      .then((data) =>
        owner ? MyProfileResDto.makeRes(data) : UserProfileResDto.makeRes(data),
      );
  }

  async createUser(
    authHandle: string,
    createUserBody: CreateUserReqDto,
  ): Promise<MsgResDto> {
    const { nickname } = createUserBody;

    await this.checkNicknameDuplicate(nickname);

    await this.userRepository.insert({
      authHandle,
      ...createUserBody,
    });

    return MsgResDto.success();
  }

  async changeUser(userId: number, changeProfileBody: ChangeUserProfileReqDto) {
    //혹시 모르니 로직 넣어둘까. => 이거 api를 따로 만들어두면 빼도 되는 부분
    const { nickname } = changeProfileBody;
    await this.checkNicknameDuplicate(nickname);

    await this.userRepository.save({
      id: userId,
      nickname,
    });

    return MsgResDto.success();
  }

  async checkNicknameDuplicate(nickname: string) {
    if (await this.userRepository.exists({ where: { nickname } }))
      throw new DiversException('DUPLICATE_NICKNAME');

    return MsgResDto.success();
  }

  // Used in AuthService
  // 더 좋은 방법이 있을까?
  async getUserWithAuth(authId: number) {
    return this.userRepository
      .findOneOrFail({
        where: { authId },
        relations: { auth: true },
      })
      .catch(() => {
        throw new DiversException('INVALID_LOGIN');
      });
  }
}
