import { Role } from 'src/server/roles/entities/roles.entity'
import { User } from 'src/server/users/entities/users.entity'

export type RolePermissions = (keyof Partial<
  Omit<Role, 'id' | 'name' | 'priority' | 'deletedAt'>
>)[]

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
