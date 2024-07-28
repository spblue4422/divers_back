export class JwtRefreshPayloadDto {
  authId: number;
}

export class JwtAccessPayloadDto extends JwtRefreshPayloadDto {
  loginId: string;

  // 서버 내의 역할 구분
  role: number;
}
