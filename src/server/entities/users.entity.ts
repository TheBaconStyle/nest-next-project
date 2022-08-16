import bcrypt, { hash } from 'bcrypt'
import { Exclude } from 'class-transformer'
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './roles.entity'
import { Booking } from './bookings.entity'

@Entity('users')
export class User {
  constructor(dto?: Partial<User>) {
    Object.assign(this, dto)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: true })
  email: string

  @Column({ unique: true, nullable: false })
  login: string

  @Column({ nullable: false })
  password: string

  @Column({ default: false, nullable: false })
  blocked: boolean

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Promise<Role[]>

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Promise<Booking[]>

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date

  @BeforeInsert()
  private async prepare() {
    this.password = await hash(this.password, 10)
  }

  public async validatePassword(password) {
    return await bcrypt.compare(password, this.password)
  }
}
