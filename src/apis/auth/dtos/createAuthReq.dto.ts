import { ApiProperty } from '@nestjs/swagger';

import { SignInReqDto } from './signInReq.dto';

export class CreateAuthReqDto extends SignInReqDto {
  @ApiProperty({ description: 'handle' })
  handle: string;

  @ApiProperty({ description: 'role' })
  role: number;
}
