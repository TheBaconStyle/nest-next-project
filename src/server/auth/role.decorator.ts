import { SetMetadata } from '@nestjs/common'
import { Role, ROLE } from './auth.constants'

export function ForRole(...roles: Role[]) {
  return SetMetadata(ROLE, roles)
}
