import { User } from 'src/server/auth/entities/users.entity'

export class CreateSessionDto {
  name: string
  hash: string
  user: User
}
