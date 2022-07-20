import { RegisterDto } from './../../auth/dto/register-user.dto'
import { Role } from './../../roles/entities/roles.entity'

export class CreateUserDto extends RegisterDto {
  roles: Role[]
}
