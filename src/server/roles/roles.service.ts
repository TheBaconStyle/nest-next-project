import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FindMany, FindOne, PageOptions, RequiredFields } from '../shared/types'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Role } from './entities/roles.entity'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}

  async create(roleDto: RequiredFields<Role, 'name'>) {
    const variant = await this.roleRepo.findOne({
      name: roleDto.name.toUpperCase(),
    })
    if (variant)
      throw new BadRequestException('Role with this name already exists')
    const basicRole = await this.getBasicRole()
    const role = new Role(roleDto)
    role.priority = basicRole.priority
    await this.roleRepo.update(basicRole, { priority: basicRole.priority + 1 })
    return await this.roleRepo.save(role)
  }

  async findMinPriority() {
    const minRole = await this.roleRepo.findOne({ order: { priority: 'DESC' } })
    return minRole ? minRole.priority : 1
  }

  async findMaxPriority() {
    const maxRole = await this.roleRepo.findOne({ order: { priority: 'ASC' } })
    return maxRole ? maxRole.priority : 0
  }

  async findOne(roleDto: FindOne<Role>) {
    return await this.roleRepo.findOne(roleDto)
  }

  async find(
    roleDtos: FindMany<Role> | FindMany<Role>[],
    pageOptions: PageOptions,
  ) {
    return await this.roleRepo.find({
      where: roleDtos,
      ...pageOptions,
      order: { priority: 'ASC' },
    })
  }

  async delete(roles: Role[]) {
    return await this.roleRepo.softRemove(roles)
  }

  async update(role: Role, opts: UpdateRoleDto) {
    return await this.roleRepo.update(role, opts)
  }

  async createRootRole() {
    const variant = await this.roleRepo.findOne({
      where: { name: 'root'.toUpperCase() },
    })
    if (variant) return variant
    const rootRole = new Role({
      name: 'root',
      priority: 0,
      haveDashboardAccess: true,
      haveDocsAccess: true,
      haveArticlesAccess: true,
      canAddArticles: true,
      canEditArticles: true,
      canDeleteArticles: true,
      haveBookingsAccess: true,
      canAddBookings: true,
      canDeleteBookings: true,
      haveCategoriesAccess: true,
      canAddCategories: true,
      canEditCategories: true,
      canDeleteCategories: true,
      haveFacilitiesAccess: true,
      canAddFacilities: true,
      canEditFacilities: true,
      canDeleteFacilities: true,
      haveRolesAccess: true,
      canAddRoles: true,
      canEditRoles: true,
      canDeleteRoles: true,
      haveUsersAccess: true,
      canAddUsers: true,
      canEditUsers: true,
      canDeleteUsers: true,
    })
    console.log('created root role')
    return await this.roleRepo.save(rootRole)
  }

  async createBasicRole() {
    const variant = await this.roleRepo.findOne({
      where: { name: 'basic'.toUpperCase() },
    })
    if (variant) return variant
    const minPriority = await this.findMinPriority()
    const basicRole = new Role({
      name: 'basic',
      priority: minPriority === 0 ? 1 : minPriority,
      canAddBookings: true,
      canDeleteBookings: true,
    })
    return await this.roleRepo.save(basicRole)
  }

  async getRootRole() {
    return await this.roleRepo.findOne({ name: 'root'.toUpperCase() })
  }

  async getBasicRole() {
    return await this.roleRepo.findOne({ name: 'basic'.toUpperCase() })
  }
}
