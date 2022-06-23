import { Role } from './../../roles/entities/roles.entity'
import { RegisterDto } from './../../auth/dto/register-user.dto'

export class CreateUserDto extends RegisterDto {
  roles: Role[]
}
