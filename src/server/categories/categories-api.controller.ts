import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('api/categories')
@ApiTags('categories')
export class CategoriesAPIController {}
