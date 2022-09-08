import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @ApiProperty()
  @MinLength(5)
  @MaxLength(20)
  name: string

  @ApiProperty({
    type: 'file',
    required: true,
  })
  img?: any
}
