import { IsString } from 'class-validator'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './users.entity'

@Entity('roles')
export class Role {
  constructor(dto?: Partial<Role>) {
    Object.assign(this, dto)
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false })
  @IsString()
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

  @ManyToOne(() => User, (user) => user.roles)
  users: Promise<User[]>

  @DeleteDateColumn({ select: false })
  deletedAt: Date

  @BeforeInsert()
  private async prepare() {
    this.name = this.name.toUpperCase()
  }
  @BeforeUpdate()
  private async update() {
    this.name = this.name.toUpperCase()
  }
}
