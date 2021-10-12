import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guard/roles.guard';
import { TokenGuard } from 'src/guard/token.guard';

export const ROLES_KEY = 'roles';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard('jwt'), RolesGuard, TokenGuard),
  );
}
