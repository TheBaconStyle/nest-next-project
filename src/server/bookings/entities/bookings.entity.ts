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

@Entity('bookings')
export class Booking {
  constructor(facility?: string, user?: User, from?: string, to?: string) {
    this.from = dayjs(from).toDate()
    this.to = dayjs(to).toDate()
    // this.facility = facility
    this.user = user
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  from: Date

  @Column()
  to: Date

  @ManyToOne(() => User, (user) => user.bookings)
  user: User

  @ManyToOne(() => Facility, (facility) => facility.bookings)
  facility: Facility

  @DeleteDateColumn()
  deletedAt: Date
}
