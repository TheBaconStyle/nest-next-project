import { Role } from './../../roles/entities/roles.entity'
import { RegisterDto } from './../../auth/dto/register-user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto extends RegisterDto {
  roles: Role[]
}
