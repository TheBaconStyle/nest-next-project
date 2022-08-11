import { Exclude } from 'class-transformer'
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Booking } from './bookings.entity'
import { Category } from './categories.entity'

@Entity('facilities')
export class Facility {
  constructor(dto?: Partial<Facility>) {
    Object.assign(this, dto)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
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
  @Exclude()
  deletedAt: Date
}
