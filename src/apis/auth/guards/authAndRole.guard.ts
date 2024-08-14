import { Request } from 'express';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Roles } from '@/common/decorators/roles';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { DiversException } from '@/common/exceptions';

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private secret = this.configService.get<string>('SECRETKEY');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // role 불러오기
    const roles = this.reflector.get(Roles, context.getHandler());

    // request 받아오기
    const request = context.switchToHttp().getRequest<Request>();

    // request에서 accessToken 뽑아오기
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

    // roles 배열에 element가 있고, role이 안맞으면 throw error
    if (roles && !roles.includes(payload.role))
      throw new DiversException('NO_PERMISSION');

    request['auth-info'] = payload as JwtAccessPayloadDto;

    return true;
  }

  private getAccessTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
