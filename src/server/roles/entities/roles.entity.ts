import { CreateRoleDto } from '../dto/create-role.dto'
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

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

  @Column()
  priority: number

  @Column()
  haveDashboardAccess: boolean

  @Column()
  haveDocsAccess: boolean

  @Column()
  haveCategoriesAccess: boolean

  @Column()
  canAddCategories: boolean

  @Column()
  canEditCategories: boolean

  @Column()
  canDeleteCategories: boolean

  @Column()
  haveFacilitiesAccess: boolean

  @Column()
  canAddFacilities: boolean

  @Column()
  canEditFacilities: boolean

  @Column()
  canDeleteFacilities: boolean

  @Column()
  haveRolesAccess: boolean

  @Column()
  canAddRoles: boolean

  @Column()
  canEditRoles: boolean

  @Column()
  canDeleteRoles: boolean

  @Column()
  haveUsersAccess: boolean

  @Column()
  canAddUsers: boolean

  @Column()
  canEditUsers: boolean

  @Column()
  canDeleteUsers: boolean

  @Column()
  haveBookingsAccess: boolean

  @Column()
  canAddBookings: boolean

  @Column()
  canDeleteBookings: boolean

  @Column()
  haveArticlesAccess: boolean

  @Column()
  canAddArticles: boolean

  @Column()
  canEditArticles: boolean

  @Column()
  canDeleteArticles: boolean

  @DeleteDateColumn()
  deletedAt: Date

  @BeforeInsert()
  private async prepare() {
    this.name = this.name.toUpperCase()
  }
}
