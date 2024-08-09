import { ApiProperty } from '@nestjs/swagger';

export class MsgResDto {
  @ApiProperty({ description: '메시지', default: '성공' })
  message: string;

  @ApiProperty({ description: '코드', default: 'SUCCESS' })
  code: string;

  static success() {
    const resDto = new MsgResDto();

    resDto.message = '성공';
    resDto.code = 'SUCCESS';

    return resDto;
  }

  static responseWithMessage(msg: string) {
    const resDto = new MsgResDto();

    resDto.message = msg;
    resDto.code = 'SUCCESS';

    return resDto;
  }
}
