import { Exclude } from 'class-transformer'
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Facility } from './../../facilities/entities/facilities.entity'
import { RequiredFields } from './../../shared/types/index'

@Entity('categories')
export class Category {
  constructor(dto?: Partial<Category>) {
    Object.assign(this, dto)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  img: string

  @OneToMany(() => Facility, (facility) => facility.category)
  facilities: Promise<Facility[]>

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date
}
