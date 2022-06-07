import { MoreThan } from 'typeorm'

export class FindSessionDto {
  user?: string
  hash?: string
  name?: string
  expiresAt?: Date | ReturnType<typeof MoreThan>
}
