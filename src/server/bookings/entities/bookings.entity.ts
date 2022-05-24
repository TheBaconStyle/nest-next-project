import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
