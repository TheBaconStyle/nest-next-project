import { CreateSessionDto } from './../dto/create-session.dto'
import { User } from 'src/server/users/entities/users.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('sessions')
export class Session {
  constructor(dto?: CreateSessionDto) {
    if (dto) {
      this.name = dto.name
      this.hash = dto.hash
      this.user = Promise.resolve(dto.user)
    }
  }

  @PrimaryColumn({ nullable: false })
  hash: string

  @Column({ nullable: false })
  name: string

  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  user: Promise<User>
}
