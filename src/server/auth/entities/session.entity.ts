import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string

  @Column()
  userAgent: string
}
