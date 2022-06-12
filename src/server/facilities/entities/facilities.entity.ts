import { Booking } from './../../bookings/entities/bookings.entity'
import { Category } from './../../categories/entities/categories.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'

@Entity('facilities')
export class Facility {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  img: string

  @ManyToOne(() => Category, (category) => category.facilities)
  category: string

  @OneToMany(() => Booking, (booking) => booking.facility)
  bookings: Booking[]

  @DeleteDateColumn()
  deletedAt: Date
}
