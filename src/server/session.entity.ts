import { Column, Entity, PrimaryColumn } from 'typeorm'
import { ISession } from 'connect-typeorm'

@Entity('sessions')
export class Session implements ISession {
  @PrimaryColumn()
  id: string

  @Column()
  expiredAt: number

  @Column()
  json: string
}
