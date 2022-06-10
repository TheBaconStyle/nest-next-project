import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetPageQueryDto } from './../shared/dto/get-page.dto'
import { CreateBookDto } from './dto/create-book.dto'
import { FindBookDto } from './dto/find-book.dto'
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

  async find(
    conditions?: FindBookDto[] | FindBookDto,
    options?: GetPageQueryDto,
  ) {
    // return await this.bookingRepo.find({
    //   where: conditions,
    //   relations: ['user'],
    //   skip: (options.page - 1) * options.size,
    //   take: options.size,
    // })
    return await this.bookingRepo.count()
  }

  async delete(dto: FindBookDto) {
    return await this.bookingRepo.delete(dto)
  }

  async findPage() {}
}
