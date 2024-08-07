import { Injectable } from '@nestjs/common';
import { UserRepostiory } from './user.repository';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { MyProfileResDto } from './dtos/myProfileRes.dto';
import { ChangeUserProfileReqDto } from './dtos/changeUserProfileReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { CreateUserReqDto } from './dtos/createUserReq.dto';
import { DiversException } from 'src/common/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepostiory) {}

  async getUserProfileById(userId: number): Promise<UserProfileResDto> {
    return this.userRepository
      .findOneByOrFail({ id: userId })
      .then((data) => UserProfileResDto.makeRes(data))
      .catch(() => {
        throw new DiversException('NO_USER');
      });
  }

  async getMyProfile(userId: number): Promise<MyProfileResDto> {
    return this.userRepository
      .findOneByOrFail({ id: userId })
      .then((data) => MyProfileResDto.makeRes(data))
      .catch(() => {
        throw new DiversException('INVALID_LOGIN');
      });
  }

  async createUser(
    authId: number,
    createUserBody: CreateUserReqDto,
  ): Promise<MsgResDto> {
    const { nickname } = createUserBody;

    if (await this.checkNicknameDuplicate(nickname))
      throw new DiversException('DUPLICATE_NICKNAME');

    await this.userRepository.insert({
      authId,
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
