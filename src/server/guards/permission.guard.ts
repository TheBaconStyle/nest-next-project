import { CanActivate, ExecutionContext, mixin } from '@nestjs/common'
import { User } from '../entities/users.entity'
import { UserRequest } from 'src/shared/types/request.type'
import { RolePermissions } from 'src/shared/types/roles.types'

export async function havePermissions(
  user: User,
  permissions: RolePermissions,
) {
  // NOTE Проверка наличия нужного разрешения у какой-либо из ролей пользователя
  return permissions.every(async (key) => {
    const roles = await user.roles
    return roles.some((role) => role[key])
  })
}

export function PermissionGuard(rolePerms: RolePermissions) {
  return mixin(
    class PermissionGuard implements CanActivate {
      async canActivate(context: ExecutionContext) {
        const { user } = context.switchToHttp().getRequest() as UserRequest
        return await havePermissions(user, rolePerms)
      }
    },
  )
}
