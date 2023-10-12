import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { throwErr } from 'src/common/utils/errorHandler';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getAccessTokenFromHeader(request);

    if (!token) {
      throwErr('NO_ACCESSTOKEN');
      //여기서 error를 던지지 말고 refresh 절차를 밟아야 하나?
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      throwErr();
    }

    return true;
  }

  private getAccessTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  private getRefreshTokenFromHeader(request: Request) {
    return request.headers.refreshToken?.toString() ?? undefined;
  }
}
