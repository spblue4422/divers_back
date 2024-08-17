import { Injectable } from '@nestjs/common';

import { CreateUserReqDto } from '@/apis/user/dtos/createUserReq.dto';
import { ModifyUserProfileReqDto } from '@/apis/user/dtos/modifyUserProfileReq.dto';
import { UserRepostiory } from '@/apis/user/user.repository';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { DiversException } from '@/common/exceptions';
import { User } from '@/entities';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepostiory) {}

  async getUserByHandle(handle: string): Promise<User> {
    return this.userRepository.findOneByAuthHandle(handle);
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

  async modifyUser(
    handle: string,
    changeProfileBody: ModifyUserProfileReqDto,
  ): Promise<MsgResDto> {
    //혹시 모르니 로직 넣어둘까. => 이거 api를 따로 만들어두면 빼도 되는 부분
    const { nickname } = changeProfileBody;
    await this.checkNicknameDuplicate(nickname);

    await this.userRepository.updateAndCatchFail(
      { authHandle: handle },
      { nickname },
    );

    return MsgResDto.success();
  }

  async checkNicknameDuplicate(nickname: string): Promise<MsgResDto> {
    if (await this.userRepository.exists({ where: { nickname } }))
      throw new DiversException('DUPLICATE_NICKNAME');

    return MsgResDto.success();
  }
}
