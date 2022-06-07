import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty()
  login?: string

  @ApiProperty()
  email?: string

  @ApiProperty()
  password?: string
}
