import { CreateRoleDto } from './../dto/create-role.dto'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('roles')
export class Role {
  constructor(dto?: CreateRoleDto) {
    if (dto) {
      this.name = dto.name
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  name: string

  @BeforeInsert()
  private async prepare() {
    this.name = this.name.toUpperCase()
  }
}
