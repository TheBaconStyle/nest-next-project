import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'
export class CreateRoleDto {
  @MaxLength(16)
  @MinLength(4, { message: 'имя роли должно содержать не менее 4 символов' })
  @IsNotEmpty()
  name: string
}
