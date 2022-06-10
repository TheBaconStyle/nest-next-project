import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../users/entities/users.entity'

export class CreateBookDto {
  @ApiProperty()
  from: Date

  @ApiProperty()
  to: Date

  user: User
}
