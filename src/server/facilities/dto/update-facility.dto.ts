import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateFacilityDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  category?: string

  @ApiPropertyOptional({
    type: 'file',
  })
  @IsOptional()
  img?: string
}
