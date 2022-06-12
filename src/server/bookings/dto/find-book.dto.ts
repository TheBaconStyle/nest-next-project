import { User } from '../../users/entities/users.entity'

export class FindBookDto {
  id?: string
  facilityId?: string
  user?: User
}
