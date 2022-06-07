import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
} from '@nestjs/common'

export function RoleGuard(...roles: string[]) {
  return mixin(
    class Guard implements CanActivate {
      canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        if (roles.length === 0) return false
        const pass = roles.every((rolename) =>
          req.user.roles.map((role) => role.name).includes(rolename),
        )
        if (!pass) throw new ForbiddenException()
      }
    },
  )
}
