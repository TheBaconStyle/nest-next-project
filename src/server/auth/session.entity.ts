import { green } from 'colors'
import { ISession } from 'connect-typeorm'
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('sessions')
export class Session implements ISession {
  @PrimaryColumn()
  id: string

  @Column()
  expiredAt: number

  @Column()
  json: string

  @Column({ nullable: true })
  user: string

  @BeforeInsert()
  async prepare() {
    console.log(green('ugay'))
  }
}
