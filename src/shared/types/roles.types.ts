import { Role } from '../../server/entities/roles.entity'

export type RolePermissions = (keyof Partial<
  Omit<Role, 'id' | 'name' | 'priority' | 'deletedAt'>
>)[]
