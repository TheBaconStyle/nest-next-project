import { Facility } from './../../facilities/entities/facilities.entity'
import { ApiProperty } from '@nestjs/swagger'

export class CreateBookDto {
  @ApiProperty()
  from: string

  @ApiProperty()
  to: string

  @ApiProperty()
  facility: Facility
}
