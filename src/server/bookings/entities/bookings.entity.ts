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
    Object.assign(this, dto)
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
