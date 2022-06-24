import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { RequiredFields } from './../../shared/types/index'

@Entity('roles')
export class Role {
  constructor(dto?: RequiredFields<Role, 'name'>) {
    if (dto) {
      this.name = dto.name
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  name: string

  @Column({})
  priority: number

  @Column({ default: false })
  haveDashboardAccess: boolean

  @Column({ default: false })
  haveDocsAccess: boolean

  @Column({ default: false })
  haveCategoriesAccess: boolean

  @Column({ default: false })
  canAddCategories: boolean

  @Column({ default: false })
  canEditCategories: boolean

  @Column({ default: false })
  canDeleteCategories: boolean

  @Column({ default: false })
  haveFacilitiesAccess: boolean

  @Column({ default: false })
  canAddFacilities: boolean

  @Column({ default: false })
  canEditFacilities: boolean

  @Column({ default: false })
  canDeleteFacilities: boolean

  @Column({ default: false })
  haveRolesAccess: boolean

  @Column({ default: false })
  canAddRoles: boolean

  @Column({ default: false })
  canEditRoles: boolean

  @Column({ default: false })
  canDeleteRoles: boolean

  @Column({ default: false })
  haveUsersAccess: boolean

  @Column({ default: false })
  canAddUsers: boolean

  @Column({ default: false })
  canEditUsers: boolean

  @Column({ default: false })
  canDeleteUsers: boolean

  @Column({ default: false })
  haveBookingsAccess: boolean

  @Column({ default: true })
  canAddBookings: boolean

  @Column({ default: true })
  canDeleteBookings: boolean

  @Column({ default: false })
  haveArticlesAccess: boolean

  @Column({ default: false })
  canAddArticles: boolean

  @Column({ default: false })
  canEditArticles: boolean

  @Column({ default: false })
  canDeleteArticles: boolean

  @DeleteDateColumn()
  deletedAt: Date

  @BeforeInsert()
  private async prepare() {
    this.name = this.name.toUpperCase()
  }
}
