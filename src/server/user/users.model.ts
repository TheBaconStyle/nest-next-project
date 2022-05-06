import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { hash } from 'bcrypt'

@Entity('users')
export class User {
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

  @BeforeInsert()
  async prepare() {
    this.password = await hash(this.password, 10)
  }
}
