import { Facility } from './../../facilities/entities/facilities.entity'
import { ApiProperty } from '@nestjs/swagger'
import { IsDate } from 'class-validator'

export class CreateBookDto {
  @ApiProperty()
  @IsDate()
  from: Date

  @IsDate()
  @ApiProperty()
  to: Date

  @ApiProperty()
  facility: string
}
