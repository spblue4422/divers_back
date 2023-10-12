import { ApiProperty } from '@nestjs/swagger';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';

export class SignInResDto extends MsgResDto {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;

  static async signInSuccess(at: string, rt: string): Promise<SignInResDto> {
    const resDto = new SignInResDto();

    resDto.code = 'SUCCESS';
    resDto.message = '성공';
    resDto.accessToken = at;
    resDto.refreshToken = rt;

    return resDto;
  }
}
