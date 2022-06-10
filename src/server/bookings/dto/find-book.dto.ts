import { User } from '../../users/entities/users.entity'

export class FindBookDto {
  id?: string
  from?: Date
  to?: Date
  user?: User
}
