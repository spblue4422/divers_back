import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { SignInReqDto } from './signInReq.dto';

export class CreateAuthReqDto extends SignInReqDto {
  @ApiProperty({ description: 'auth_handle' })
  @IsString()
  handle: string;

  @ApiProperty({ description: '계정 역할' })
  @IsNumber()
  role: number;
}
