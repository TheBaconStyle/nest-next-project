import { Exclude } from 'class-transformer'
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
  constructor(dto?: Partial<Booking>) {
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
  @Exclude()
  deletedAt: Date
}
