import { OmitType } from '@nestjs/swagger'
import { Category } from './../entities/categories.entity'
export class CreateCategoryDto extends OmitType(Category, ['id']) {}
