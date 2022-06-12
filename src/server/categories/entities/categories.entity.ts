import { Facility } from './../../facilities/entities/facilities.entity'
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  img: string

  @OneToMany(() => Facility, (facility) => facility.category)
  facilities: Facility[]

  @DeleteDateColumn()
  deletedAt: Date
}
