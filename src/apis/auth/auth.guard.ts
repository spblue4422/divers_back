import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtAccessPayloadDto } from 'src/common/dtos/jwtPayload.dto';
import { DiversException } from 'src/common/exceptions';

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

    request['user'] = payload as JwtAccessPayloadDto;

    return true;
  }

  private getAccessTokenFromHeader(request: Request) {
    // access token은 authorization으로 받고, refresh token은 따로 받는건가?
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //const refreshToken =
    //  request.headers['refresh-token'].toString() ?? undefined;

    //return { accessToken: type === 'Bearer' ? token : undefined, refreshToken };
    return type === 'Bearer' ? token : undefined;
  }
}
