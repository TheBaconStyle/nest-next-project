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
import { ApiProperty } from '@nestjs/swagger'

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
  category: Promise<Category>

  @OneToMany(() => Booking, (booking) => booking.facility)
  bookings: Promise<Booking[]>

  @DeleteDateColumn()
  deletedAt: Date
}
