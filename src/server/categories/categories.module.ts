import { Category } from './entities/categories.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesService } from './categories.service'
import { CategoriesAPIController } from './categories-api.controller'
import { Module } from '@nestjs/common'
import { NestjsFormDataModule } from 'nestjs-form-data'

@Module({
  imports: [NestjsFormDataModule, TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesAPIController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
