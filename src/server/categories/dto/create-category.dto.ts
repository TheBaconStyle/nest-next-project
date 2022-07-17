import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data'

export class CreateCategoryDto {
  @IsString()
  @ApiProperty()
  @MinLength(5)
  @MaxLength(20)
  name: string

  @IsFile()
  @HasMimeType(['image/png', 'image/jpeg', 'image/jpg', 'image/gif'])
  @MaxFileSize(2e6)
  @ApiProperty({
    type: 'file',
  })
  img: FileSystemStoredFile
}
