import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/server/users/entities/users.entity'
import { MoreThan, Repository } from 'typeorm'
import { FindPageDto } from './../shared/types/find-page.type'
import { CreateBookDto } from './dto/create-book.dto'
import { Booking } from './entities/bookings.entity'

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async create(dto: CreateBookDto) {
    const book = new Booking(dto)
    return await this.bookingRepo.save(book)
  }

  async findForDashboard({ page, pageSize }: FindPageDto) {
    return await this.bookingRepo.find({
      skip: (page > 0 ? page : 0) * pageSize,
      take: pageSize,
      order: {
        from: 'ASC',
      },
    })
  }

  async findByFacility(facilityId: string, pageOpts?: FindPageDto) {
    return await this.bookingRepo.find({
      order: {
        from: 'ASC',
      },
      where: { facility: { id: facilityId }, from: MoreThan(new Date()) },
    })
  }

  async findByDate(date: Date, { page, pageSize }: FindPageDto) {
    return await this.bookingRepo.find({
      skip: (page > 0 ? page : 0) * pageSize,
      take: pageSize,
      order: {
        from: 'ASC',
      },
      where: [{ from: date }, { to: date }],
    })
  }

  async canBook(user: User) {
    return (await this.bookingRepo.count({ where: { user } })) <= 5
  }

  async deleteById(id: string) {
    return await this.bookingRepo.delete({ id })
  }
}
