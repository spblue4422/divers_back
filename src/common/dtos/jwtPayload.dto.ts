import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshPayloadDto {
  @ApiProperty({ description: 'handle string' })
  handle: string;
}

export class JwtAccessPayloadDto extends JwtRefreshPayloadDto {
  @ApiProperty({
    description: 'user, shop, admin id중 하나 role 보고 구분',
  })
  keyId: number;

  // 서버 내의 역할 구분
  @ApiProperty({
    description: 'user - 100, shop - 200, admin - 888',
  })
  role: number;
}
