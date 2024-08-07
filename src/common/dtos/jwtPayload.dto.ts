import { ApiProperty } from '@nestjs/swagger';

export class JwtRefreshPayloadDto {
  authId: number;
}

export class JwtAccessPayloadDto extends JwtRefreshPayloadDto {
  // userShopId로 바꾸기, CurrentUser -> Current로 바꾸기, Roleguard 한번에 적용
  @ApiProperty({ description: '유저/샵 id' })
  userShopId: number;

  // 서버 내의 역할 구분
  @ApiProperty({
    description: 'user - 100, shop - 200, admin - 888',
  })
  role: number;
}
