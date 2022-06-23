import {
  havePermissions,
  RolePermissions,
} from './../../shared/utils/identify-permissions.helper'
import { CanActivate, ExecutionContext, mixin } from '@nestjs/common'
import { Request } from 'express'
import { User } from '../../users/entities/users.entity'

export function RoleGuard(rolePerms: RolePermissions) {
  return mixin(
    class Guard implements CanActivate {
      canActivate(context: ExecutionContext) {
        const { user }: Request & { user: User } = context
          .switchToHttp()
          .getRequest()
        return havePermissions(user, rolePerms)
      }
    },
  )
}
