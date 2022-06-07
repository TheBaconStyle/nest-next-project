import { User } from 'src/server/auth/entities/users.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { CreateSessionDto } from './../dto/create-session.dto'

@Entity('sessions')
export class Session {
  constructor(dto?: CreateSessionDto) {
    if (dto) {
      this.name = dto.name
      this.hash = dto.hash
      this.user = dto.user
    }
  }

  @PrimaryColumn({ nullable: false })
  hash: string

  @Column({ nullable: false })
  name: string

  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  user: User
}
