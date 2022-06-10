import { CategoriesService } from './categories.service'
import { CategoriesAPIController } from './categories-api.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [CategoriesAPIController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
