import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateFacilityDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  description: string

  @ApiProperty()
  @IsString()
  category: string

  @ApiProperty({
    type: 'file',
    required: true,
  })
  img?: any
}
