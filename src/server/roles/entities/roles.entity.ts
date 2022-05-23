import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  name: string

  @BeforeInsert()
  private async prepare() {
    this.name = this.name.toUpperCase()
  }
}
