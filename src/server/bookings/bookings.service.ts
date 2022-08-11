import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  FindMany,
  FindOne,
  OneOrMany,
  RequiredFields,
} from 'src/shared/types/database.type'
import { Between, Repository } from 'typeorm'
import { Booking } from '../entities/bookings.entity'
import dayjs from 'dayjs'

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async create(
    dto: RequiredFields<Booking, 'from' | 'to' | 'facility' | 'user'>,
  ) {
    dto.from = dayjs(dto.from).startOf('hour').toDate()
    dto.to = dayjs(dto.to).startOf('hour').toDate()
    const variants = await this.find({
      where: [
        {
          from: Between(dto.from, dto.to),
          facility: { id: (await dto.facility).id },
        },
        {
          to: Between(dto.from, dto.to),
          facility: { id: (await dto.facility).id },
        },
      ],
    })
    if (variants.length > 0) {
      throw new BadRequestException(
        'Your booking time is crossing another booking',
      )
    }
    const booking = new Booking({ ...dto })
    return await this.bookingRepo.save(booking)
  }

  async findOne(findData: FindOne<Booking>) {
    return await this.bookingRepo.findOne({ where: findData })
  }

  async find(findData: FindMany<Booking>) {
    return await this.bookingRepo.find({
      ...findData,
      order: { from: 'ASC' },
    })
  }

  async delete(bookings: OneOrMany<Booking>) {
    const variants: Booking[] = []
    if (Array.isArray(bookings)) {
      variants.push(...bookings)
    } else {
      variants.push(bookings)
    }
    return await this.bookingRepo.softRemove(variants)
  }
}
