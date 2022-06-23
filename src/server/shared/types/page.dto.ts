import { IsNotEmpty, IsNumber } from 'class-validator'

export interface PageOptions {
  take: number
  skip: number
}

export class PageDto implements PageOptions {
  @IsNotEmpty()
  @IsNumber()
  skip: number

  @IsNotEmpty()
  @IsNumber()
  take: number
}
