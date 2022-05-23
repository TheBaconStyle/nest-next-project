import { hash } from 'bcrypt'
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
<<<<<<< HEAD
import { Role } from './roles.entity'
=======
import { Role } from '../../roles/entities/roles.entity'
>>>>>>> master

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
<<<<<<< HEAD
  id?: string
=======
  id: string
>>>>>>> master

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
<<<<<<< HEAD
  roles?: Role[]
=======
  roles: Role[]
>>>>>>> master

  @BeforeInsert()
  private async prepare() {
    this.password = await hash(this.password, 10)
  }
}
