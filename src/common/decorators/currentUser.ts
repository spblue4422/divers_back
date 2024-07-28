import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtAccessPayloadDto } from '../dtos/jwtPayload.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const user: JwtAccessPayloadDto = request['user'];

    return user;
  },
);
