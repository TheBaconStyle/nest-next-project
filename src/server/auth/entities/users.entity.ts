import { RegisterDto } from './../dto/register-user.dto'
import { Session } from './sessions.entity'
import bcrypt, { hash } from 'bcrypt'
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './roles.entity'

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

  @Column({ unique: true, nullable: false })
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

  @BeforeInsert()
  private async prepare() {
    this.password = await hash(this.password, 10)
  }

  public async validatePassword(password) {
    return await bcrypt.compare(password, this.password)
  }
}
