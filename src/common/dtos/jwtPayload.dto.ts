import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshPayloadDto {
  @ApiProperty({ description: 'handle string' })
  handle: string;
}

export class JwtAccessPayloadDto extends JwtRefreshPayloadDto {
  // 서버 내의 역할 구분
  @ApiProperty({
    description: 'user - 100, shop - 200, admin - 888',
  })
  role: number;
}
