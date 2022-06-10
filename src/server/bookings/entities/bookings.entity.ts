import { User } from 'src/server/users/entities/users.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CreateBookDto } from '../dto/create-book.dto'

@Entity('bookings')
export class Booking {
  constructor(dto?: CreateBookDto) {
    if (dto) {
      this.from = dto.from
      this.to = dto.to
      this.user = dto.user
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  from: Date

  @Column()
  to: Date

  @ManyToOne(() => User, (user) => user.bookings)
  user: User
}
