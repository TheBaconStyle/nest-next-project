import { Category } from './entities/categories.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesService } from './categories.service'
import { CategoriesAPIController } from './categories-api.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesAPIController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
