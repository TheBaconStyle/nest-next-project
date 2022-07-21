import { ApiProperty } from '@nestjs/swagger'

export class CreateFacilityDto {
  name: string
  description: string
  category: string

  @ApiProperty({
    type: 'file',
    required: true,
  })
  img?: any
}
