import { hash } from 'bcrypt'
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './roles.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ unique: true, nullable: false })
  login: string

  @Column({ nullable: false })
  password: string

  @Column({ default: false, nullable: false })
  blocked?: boolean

  @ManyToMany(() => Role)
  @JoinTable()
  roles?: Role[]

  @BeforeInsert()
  private async prepare() {
    this.password = await hash(this.password, 10)
  }
}
