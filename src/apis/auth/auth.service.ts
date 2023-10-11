import { Injectable } from '@nestjs/common';
import { AuthShopRepository, AuthUserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { throwErr } from 'src/common/utils/errorHandler';

@Injectable()
export class AuthService {
  constructor(
    private readonly uAuthRepository: AuthUserRepository,
    private readonly sAuthRepository: AuthShopRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginId: string, password: string) {
    const uAuth = await this.uAuthRepository.findOne({ where: { loginId } });
    const encrypted = await bcrypt.hash(password, uAuth.salt);

    if (bcrypt.compare(password, encrypted)) {
      const accessToken = await this.jwtService.signAsync(
        { userId: uAuth.userId, loginId },
        { secret: 'spblue4422', expiresIn: '600S' },
      );

      const refreshToken = await this.jwtService.signAsync(
        { userId: uAuth.userId, loginId },
        { secret: 'spblue4422', expiresIn: '3600s' },
      );

      return {
        accessToken,
        refreshToken,
      };
    } else throwErr(); // 틀린 비밀번호
  }
}
