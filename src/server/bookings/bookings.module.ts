import { FacilitiesModule } from './../facilities/facilities.module'
import { BookingsAPIController } from './controllers/bookings-api.controller'
import { Booking } from './entities/bookings.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookingsService } from './bookings.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), FacilitiesModule],
  providers: [BookingsService],
  controllers: [BookingsAPIController],
  exports: [BookingsService],
})
export class BookingsModule {}
