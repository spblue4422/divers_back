import { ApiProperty } from '@nestjs/swagger';

import { MsgResDto } from '@/common/dtos/msgRes.dto';

export class SignInResDto extends MsgResDto {
  @ApiProperty({ description: '액세스 토큰', default: 'accessToken' })
  accessToken: string;

  @ApiProperty({ description: '리프레쉬 토큰', default: 'refreshToken' })
  refreshToken: string;

  static signInSuccess(at: string, rt: string): SignInResDto {
    const resDto = new SignInResDto();

    resDto.code = 'SUCCESS';
    resDto.message = '성공';
    resDto.accessToken = at;
    resDto.refreshToken = rt;

    return resDto;
  }
}
