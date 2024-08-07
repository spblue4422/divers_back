import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/common/decorators/roles';
import { DiversException } from 'src/common/exceptions';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    // Is this right?
    if (!roles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const { role } = request['auth-info'];

    return this.matchRoles(role, roles);
  }

  private matchRoles(role: number, roles: number[]): boolean {
    // if (role == 888) return true;
    if (role in roles) return true;
    else throw new DiversException('NO_PERMISSON');
  }
}
