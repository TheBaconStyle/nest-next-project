import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('session')
export class Session {
  @PrimaryColumn()
  id?: string

  @Column()
  expiredAt: number

  @Column()
  json: string
}
