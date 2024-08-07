import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtAccessPayloadDto } from '../dtos/jwtPayload.dto';

export const Current = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const cur: JwtAccessPayloadDto = request['auth-info'];

    return cur;
  },
);
