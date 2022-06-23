import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PageOptions } from '../shared/types/page.dto'
import { FindMany, FindOne } from './../shared/types/find.type'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/roles.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  async create(roleDto: CreateRoleDto) {
    const variant = await this.roleRepo.findOne({
      name: roleDto.name.toUpperCase(),
    })
    if (variant)
      throw new BadRequestException('Role with this name already exists')
    const maxPriority = await this.findMaxPriority()
    const role = new Role(roleDto)
    role.priority = maxPriority
    await this.roleRepo.update(
      { priority: maxPriority },
      { priority: maxPriority + 1 },
    )
    return await this.roleRepo.save(role)
  }

  async findMinPriority() {
    return (
      (await this.roleRepo.findOne({ order: { priority: 'DESC' } })).priority |
      1
    )
  }

  async findMaxPriority() {
    return (
      (await this.roleRepo.findOne({ order: { priority: 'ASC' } })).priority | 0
    )
  }

  async findOne(roleDto: FindOne<Role>) {
    return await this.roleRepo.findOne({ where: roleDto })
  }

  async find(roleDtos: FindMany<Role>, pageOptions: PageOptions) {
    return await this.roleRepo.find({ where: roleDtos, ...pageOptions })
  }

  async delete(roles: Role[]) {
    return await this.roleRepo.softRemove(roles)
  }

  async update(name: string, opts: UpdateRoleDto) {
    return await this.roleRepo.update({ name }, opts)
  }

  async createRootRole() {
    const variant = await this.roleRepo.findOne({
      where: { name: 'root'.toUpperCase() },
    })
    if (variant) return variant
    const rootRole = new Role({ name: 'root' })
    rootRole.priority = await this.findMaxPriority()
    rootRole.haveDashboardAccess = true
    rootRole.haveDocsAccess = true
    rootRole.haveArticlesAccess = true
    rootRole.canAddArticles = true
    rootRole.canEditArticles = true
    rootRole.canDeleteArticles = true
    rootRole.haveBookingsAccess = true
    rootRole.canAddBookings = true
    rootRole.canDeleteBookings = true
    rootRole.haveCategoriesAccess = true
    rootRole.canAddCategories = true
    rootRole.canEditCategories = true
    rootRole.canDeleteCategories = true
    rootRole.haveFacilitiesAccess = true
    rootRole.canAddFacilities = true
    rootRole.canEditFacilities = true
    rootRole.canDeleteFacilities = true
    rootRole.haveRolesAccess = true
    rootRole.canAddRoles = true
    rootRole.canEditRoles = true
    rootRole.canDeleteRoles = true
    rootRole.haveUsersAccess = true
    rootRole.canAddUsers = true
    rootRole.canEditUsers = true
    rootRole.canDeleteUsers = true
    return await this.roleRepo.save(rootRole)
  }

  async createBasicRole() {
    const variant = await this.roleRepo.findOne({
      where: { name: 'basic'.toUpperCase() },
    })
    if (variant) return variant
    const rootRole = new Role({ name: 'basic' })
    rootRole.priority = (await this.findMinPriority()) + 1
    rootRole.canAddBookings = true
    rootRole.canDeleteBookings = true
    return await this.roleRepo.save(rootRole)
  }

  async getRootRole() {
    return await this.roleRepo.findOne({ name: 'root'.toUpperCase() })
  }

  async getBasicRole() {
    return await this.roleRepo.findOne({ name: 'basic'.toUpperCase() })
  }
}
