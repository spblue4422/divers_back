import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshPayloadDto {
  authId: number;
}

export class JwtAccessPayloadDto extends JwtRefreshPayloadDto {
  // userShopId로 바꾸기, CurrentUser -> Current로 바꾸기, Roleguard 한번에 적용
  @ApiProperty({ description: '유저 id' })
  userId: number;

  // 서버 내의 역할 구분
  role: number;
}
