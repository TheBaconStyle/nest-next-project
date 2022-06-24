import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import dayjs from 'dayjs'
import { User } from 'src/server/users/entities/users.entity'
import { Between, Repository } from 'typeorm'
import { PageOptions } from '../shared/types'
import { CreateBookDto } from './dto/create-book.dto'
import { Booking } from './entities/bookings.entity'

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async create(dto: CreateBookDto, user: User) {
    // const book = new Booking()
    // book.facility.id = dto.facility
    // return await this.bookingRepo.save(book)
  }

  async findForDashboard(pageOptions: PageOptions) {
    return await this.bookingRepo.find({
      ...pageOptions,
      order: {
        from: 'ASC',
      },
    })
  }

  async findForFacility(facilityId: string, date: Date) {
    return await this.bookingRepo.find({
      order: {
        from: 'ASC',
      },
      where: {
        facility: { id: facilityId },
        from: Between(date, dayjs(date).add(1, 'day').toDate()),
      },
    })
  }

  async findForUser(user: User, pageOptions: PageOptions) {
    return await this.bookingRepo.find({
      ...pageOptions,
      order: {
        from: 'ASC',
      },
      where: { user },
    })
  }

  async canBook(user: User, max: number) {
    return (await this.bookingRepo.count({ where: { user } })) <= max
  }

  async deleteById(id: string) {
    return await this.bookingRepo.delete({ id })
  }
}
