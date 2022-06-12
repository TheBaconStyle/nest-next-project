import bcrypt, { hash } from 'bcrypt'
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
import { Booking } from '../../bookings/entities/bookings.entity'
import { RegisterDto } from '../../auth/dto/register-user.dto'
import { Role } from '../../roles/entities/roles.entity'
import { Session } from '../../auth/entities/sessions.entity'

@Entity('users')
export class User {
  constructor(dto?: RegisterDto) {
    if (dto) {
      this.email = dto.email
      this.password = dto.password
      this.login = dto.login
    }
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
  roles: Role[]

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[]

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[]

  @DeleteDateColumn()
  deletedAt: Date

  @BeforeInsert()
  private async prepare() {
    this.password = await hash(this.password, 10)
  }

  public async validatePassword(password) {
    return await bcrypt.compare(password, this.password)
  }
}
