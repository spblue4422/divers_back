import { Injectable } from '@nestjs/common';

import { AWSService } from '@/apis/aws/aws.service';
import { CreateUserReqDto } from '@/apis/user/dtos/createUserReq.dto';
import { ModifyUserProfileReqDto } from '@/apis/user/dtos/modifyUserProfileReq.dto';
import { UserRepostiory } from '@/apis/user/user.repository';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { DiversException } from '@/common/exceptions';
import { User } from '@/entities';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepostiory,
    private readonly awsService: AWSService,
  ) {}

  async getUser(handle: string) {
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
    userId: number,
    changeProfileBody: ModifyUserProfileReqDto,
  ): Promise<MsgResDto> {
    //혹시 모르니 로직 넣어둘까. => 이거 api를 따로 만들어두면 빼도 되는 부분
    const { nickname } = changeProfileBody;
    await this.checkNicknameDuplicate(nickname);

    await this.userRepository.updateAndCatchFail({ id: userId }, { nickname });

    return MsgResDto.success();
  }

  async checkNicknameDuplicate(nickname: string): Promise<MsgResDto> {
    if (await this.userRepository.exists({ where: { nickname } }))
      throw new DiversException('DUPLICATE_NICKNAME');

    return MsgResDto.success();
  }

  async modifyProfileImage(
    userId: number,
    image: Express.Multer.File,
  ): Promise<MsgResDto> {
    const { profileImageName: oldImageName } =
      await this.userRepository.findOneByUserId(userId);

    const newImageName: string = await this.awsService
      .uploadImageToS3(
        oldImageName,
        v4(),
        image,
        image.originalname.split('.').pop(),
      )
      .catch(() => {
        throw new DiversException('AWS_S3_ERROR'); // S3 error 추가 필요
      });

    await this.userRepository.updateAndCatchFail(
      { id: userId },
      { profileImageName: newImageName },
    );

    return MsgResDto.success();
  }
}
