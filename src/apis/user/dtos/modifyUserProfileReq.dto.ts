import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ModifyUserProfileReqDto {
  @ApiProperty({ description: '닉네임' })
  @IsString()
  nickname: string;
}
