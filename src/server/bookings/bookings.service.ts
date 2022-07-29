import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
<<<<<<< HEAD
import dayjs from 'dayjs'
import { Between, Repository } from 'typeorm'
import {
  FindMany,
  FindOne,
  OneOrMany,
  RequiredFields,
} from './../shared/types/index'
=======
import { Repository } from 'typeorm'
import { FindMany, FindOne, RequiredFields } from './../shared/types/index'
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
import { Booking } from './entities/bookings.entity'

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

<<<<<<< HEAD
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
=======
  async create() {
    // dto: RequiredFields<Booking, 'from' | 'to' | 'facility' | 'user'>,
    // dto.from = dayjs(dto.from).startOf('hour').toDate()
    // const fromDate = dto.from.toISOString().replace(/T/g, ' ').replace(/Z/g, '')
    // dto.to = dayjs(dto.to).startOf('hour').toDate()
    // const toDate = dto.to.toISOString().replace(/T/g, ' ').replace(/Z/g, '')
    // const variants = await this.find({
    //   where: [
    //     {
    //       from: Between(fromDate, toDate),
    //       facility: await dto.facility,
    //     },
    //     {
    //       to: Between(fromDate, toDate),
    //       facility: await dto.facility,
    //     },
    //   ],
    // })
    // if (variants.length > 0) {
    //   throw new BadRequestException(
    //     'Your booking time is crossing another booking',
    //   )
    // }
    // const booking = new Booking({ ...dto })
    // return await this.bookingRepo.save(booking)
    console.log('qwe')
  }

  async findOne(findData: FindOne<Booking>) {
    // return await this.bookingRepo.findOne({ where: findData })
  }
  async find(findData: FindMany<Booking>) {
    // return await this.bookingRepo.find({
    //   where: findData.where,
    //   ...findData.page,
    //   order: { from: 'ASC' },
    // })
  }

  async delete(bookings: Booking | Booking[]) {
    // return await this.bookingRepo.softRemove(bookings)
>>>>>>> aa434c06d5ecfc7016371eee813ff3d355f60f02
  }
}
