import { Request } from 'express';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { DiversException } from '@/common/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private secret = this.configService.get<string>('SECRETKEY');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = this.getAccessTokenFromHeader(request);

    if (!accessToken) {
      throw new DiversException('NO_ACCESSTOKEN');
    }

    // 로그인 확인에서 복잡한 로직을 집어넣지 말자.
    const payload = await this.jwtService
      .verifyAsync(accessToken, { secret: this.secret })
      .catch(() => {
        throw new DiversException('INVALID_TOKEN');
      });

    request['auth-info'] = payload as JwtAccessPayloadDto;

    return true;
  }

  private getAccessTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
