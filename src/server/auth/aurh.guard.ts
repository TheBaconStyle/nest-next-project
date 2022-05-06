import {
  CanActivate,
  ExecutionContext,
  mixin,
  UnauthorizedException,
} from '@nestjs/common'
import { Role } from './auth.constants'

export function RoleGuard(...roles: Role[]) {
  class Guard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()
      const user = request.session.user
      if (!user) {
        throw new UnauthorizedException('Unauthorized')
      }
      if (!roles) {
        return true
      }
      return user.roles.reduce()
    }
  }
  const guard = mixin(Guard)
  return guard
}
