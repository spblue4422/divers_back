import { ApiProperty } from '@nestjs/swagger';

export class SignInResDto {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;
}
