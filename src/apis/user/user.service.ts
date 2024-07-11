import { Injectable } from '@nestjs/common';
import { UserRepostiory } from './user.repository';
import { UserProfileResDto } from './dtos/userProfileRes.dto';
import { MyProfileResDto } from './dtos/myProfileRes.dto';
import { modifyUserProfileReqDto } from './dtos/modifyUserProfileReq.dto';
import { throwErr } from 'src/common/utils/errorHandler';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { CreateUserProfileReqDto } from './dtos/createUserProfileReq.dto';
import { InsertResult } from 'typeorm';

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
    createUserBody: CreateUserProfileReqDto,
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

  async modifyUser(userId: number, modifyUserBody: modifyUserProfileReqDto) {
    const user = await this.userRepository.findOneByUserId(userId);

    //혹시 모르니 로직 넣어둘까.
    const { nickname } = modifyUserBody;
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
