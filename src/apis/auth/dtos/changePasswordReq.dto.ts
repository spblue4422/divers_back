import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordReqDto {
  @ApiProperty({ description: '기존의 비밀번호' })
  @IsString()
  existingPassword: string;

  @ApiProperty({ description: '새로운 비밀번호' })
  @IsString()
  newPassword: string;
}
