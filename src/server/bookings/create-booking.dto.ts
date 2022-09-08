import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsDate, IsString } from 'class-validator'

export class CreateBookDto {
  @IsDate()
  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  from: Date

  @IsDate()
  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  to: Date

  @IsString()
  @ApiProperty()
  facility: string
}
