import { User } from 'src/server/users/entities/users.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string

  @Column()
  userAgent: string

  @ManyToOne(() => User, (user) => user.sessions)
  user: User
}
