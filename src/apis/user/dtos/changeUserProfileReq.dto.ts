import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangeUserProfileReqDto {
  @ApiProperty({ description: '닉네임' })
  @IsString()
  nickname: string;
}
