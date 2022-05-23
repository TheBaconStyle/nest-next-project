<<<<<<< HEAD
import { CanActivate, ExecutionContext, mixin } from '@nestjs/common'
=======
import {
  CanActivate,
  ExecutionContext,
  mixin,
  UnauthorizedException,
} from '@nestjs/common'
>>>>>>> master

export function RoleGuard(...roles: string[]) {
  return mixin(
    class Guard implements CanActivate {
      canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
<<<<<<< HEAD
        if (roles.length === 0) return true
        return roles.every((rolename) =>
          req.user.roles.map((role) => role.name).includes(rolename),
        )
=======
        if (roles.length === 0) return false
        const pass = roles.every((rolename) =>
          req.user.roles.map((role) => role.name).includes(rolename),
        )
        if (!pass) throw new UnauthorizedException()
>>>>>>> master
      }
    },
  )
}
