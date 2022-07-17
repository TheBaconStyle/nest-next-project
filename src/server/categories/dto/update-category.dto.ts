import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data'

export class UpdateCategoryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  name?: string

  @HasMimeType(['image/png', 'image/jpeg', 'image/jpg', 'image/gif'])
  @MaxFileSize(2e6)
  @ApiPropertyOptional({
    type: 'file',
  })
  @IsOptional()
  @IsFile()
  img?: FileSystemStoredFile
}
