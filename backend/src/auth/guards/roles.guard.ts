import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    // If no @Roles() decorator is present, the route is public
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const userRole = (user?.role || '').toLowerCase();
    const hasRole = requiredRoles.some((r) => r.toLowerCase() === userRole);

    if (!user || !hasRole) {
      throw new ForbiddenException('You do not have the required dashboard permissions for this action.');
    }

    return true;
  }
}