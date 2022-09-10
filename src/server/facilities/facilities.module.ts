import { CategoriesModule } from './../categories/categories.module'
import { Facility } from '../entities/facilities.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'
import { FacilitiesService } from './facilities.service'
import { FacilitiesController } from './facilities.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility]),
    forwardRef(() => CategoriesModule),
  ],
  providers: [FacilitiesService],
  controllers: [FacilitiesController],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}
