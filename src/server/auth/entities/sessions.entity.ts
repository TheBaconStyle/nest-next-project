import { User } from 'src/server/users/entities/users.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('sessions')
export class Session {
  constructor(dto?: Partial<Session>) {
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
