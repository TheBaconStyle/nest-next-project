import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  name: string
}
