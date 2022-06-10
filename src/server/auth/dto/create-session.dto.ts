import { User } from 'src/server/users/entities/users.entity'

export class CreateSessionDto {
  name: string
  hash: string
  user: User
}
