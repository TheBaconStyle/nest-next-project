import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Booking } from '../entities/bookings.entity'
import { FacilitiesModule } from '../facilities/facilities.module'
import { BookingsController } from './bookings.controller'
import { BookingsService } from './bookings.service'

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), FacilitiesModule],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
