<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn } from 'typeorm'
=======
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
>>>>>>> master

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string
<<<<<<< HEAD
=======

  @Column()
  token: string

  @Column()
  userAgent: string
>>>>>>> master
}
