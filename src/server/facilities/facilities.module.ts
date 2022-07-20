import { CategoriesModule } from './../categories/categories.module'
import { FacilitiesService } from './facilities.service'
import { FacilitiesAPIController } from './facilities-api.controller'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Facility } from './entities/facilities.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Facility]), CategoriesModule],
  controllers: [FacilitiesAPIController],
  providers: [FacilitiesService],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}
