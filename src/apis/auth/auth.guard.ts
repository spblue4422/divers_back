import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';
import { JwtPayloadDto } from 'src/common/dtos/jwtPayload.dto';
import { throwErr } from 'src/common/utils/errorHandler';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { accessToken, refreshToken } =
      this.getAccessTokenFromHeader(request);

    if (!accessToken) {
      throwErr('NO_ACCESSTOKEN');
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken);
      request['user'] = payload as JwtPayloadDto;
    } catch (error) {
      if (!refreshToken) throwErr('NO_REFRESHTOKEN');
    }

    /*
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      // 여기서 refreshToken을 새로 발급 받기?
    } catch (error) {
      throwErr('EXPIRED_TOKEN');
    }
    */

    return true;
  }

  private getAccessTokenFromHeader(request: Request) {
    // access token은 authorization으로 받고, refresh token은 따로 받는건가?
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const refreshToken = request.headers.refreshToken?.toString() ?? undefined;

    return { accessToken: type === 'Bearer' ? token : undefined, refreshToken };
  }

  private getRefreshTokenFromHeader(request: Request) {
    return request.headers.refreshToken?.toString() ?? undefined;
  }
}
