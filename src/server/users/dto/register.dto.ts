import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
  @ApiProperty()
  login?: string

  @ApiProperty()
  email?: string

  @ApiProperty()
  password?: string

  roles?: string[]
}
