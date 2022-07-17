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
  constructor(dto?: RequiredFields<Category, 'name' | 'img'>) {
    if (dto) {
      this.name = dto.name
      this.img = dto.img
    }
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
  deletedAt: Date
}
