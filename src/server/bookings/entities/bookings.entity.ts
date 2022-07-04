import dayjs from 'dayjs'
import { User } from 'src/server/users/entities/users.entity'
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Facility } from './../../facilities/entities/facilities.entity'
import { CreateBookDto } from './../dto/create-book.dto'

@Entity('bookings')
export class Booking {
  constructor(dto?: CreateBookDto & { user: User }) {
    if (dto) {
      this.from = dayjs(dto.from).toDate()
      this.to = dayjs(dto.to).toDate()
      this.facility = Promise.resolve(dto.facility)
      this.user = Promise.resolve(dto.user)
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  from: Date

  @Column()
  to: Date

  @ManyToOne(() => User, (user) => user.bookings)
  user: Promise<User>

  @ManyToOne(() => Facility, (facility) => facility.bookings)
  facility: Promise<Facility>

  @DeleteDateColumn()
  deletedAt: Date
}
