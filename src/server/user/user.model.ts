import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  email: string

  @Column()
  username: string

  @Column()
  password: string

  @Column({ default: false })
  blocked: boolean
}
