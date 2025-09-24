import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from 'contract/enum';
import { ROLES_KEY } from '@/auth/decorators/auth.decorator';
import { Account } from '@/auth/entities/account.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const account: Account = request.user;

    if (account.admin && account.admin.isVerified === false) {
      throw new UnauthorizedException('Admin is not verified');
    }

    return requiredRoles.some((role) => account.role === role);
  }
}
