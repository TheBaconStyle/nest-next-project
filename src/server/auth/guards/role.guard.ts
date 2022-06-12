import { RolePermissions } from './../../shared/utils/identify-permissions.helper'
import { CanActivate, ExecutionContext, mixin } from '@nestjs/common'
import { Request } from 'express'
import { User } from './../../users/entities/users.entity'

export function RoleGuard(roleConds: RolePermissions) {
  return mixin(
    class Guard implements CanActivate {
      canActivate(context: ExecutionContext) {
        const { user }: Request & { user: User } = context
          .switchToHttp()
          .getRequest()
        return Object.entries(roleConds).every(([key, value]) => {
          return user.roles.some((role) => role[key] === value)
        })
      }
    },
  )
}
