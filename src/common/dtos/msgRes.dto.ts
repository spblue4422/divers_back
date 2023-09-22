import { ApiProperty } from '@nestjs/swagger';

export class MsgResDto {
  @ApiProperty({ description: '메시지' })
  message: string;

  @ApiProperty({ description: '코드' })
  code: string;

  static async success() {
    const resDto = new MsgResDto();
    resDto.message = '성공';
    resDto.code = 'SUCCESS';

    return resDto;
  }
}
