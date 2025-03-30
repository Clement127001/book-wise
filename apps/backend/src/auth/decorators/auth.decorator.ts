import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Account } from '@/auth/entities/account.entity';
import { JWTAuthGuard } from '@/auth/jwt-auth.guard';
import { RolesGuard } from '@/auth/roles.guard';
import { UserRoleEnum } from 'contract/enum';
import { OptionalJWTAuthGuard } from '@/auth/optional.guard';

export const ROLES_KEY = 'roles';

export const account = createParamDecorator(
  (_data, ctx: ExecutionContext): Account => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const getAccountFromToken = account;

export const Auth = () => {
  return applyDecorators(UseGuards(JWTAuthGuard));
};

export const AdminOnlyAuth = () => {
  return applyDecorators(
    UseGuards(JWTAuthGuard, RolesGuard),
    SetMetadata(ROLES_KEY, [UserRoleEnum.ADMIN]),
  );
};

export const UserOnlyAuth = () => {
  return applyDecorators(
    UseGuards(JWTAuthGuard, RolesGuard),
    SetMetadata(ROLES_KEY, [UserRoleEnum.USER]),
  );
};

export const OptionalAuth = () => {
  return applyDecorators(UseGuards(OptionalJWTAuthGuard));
};
