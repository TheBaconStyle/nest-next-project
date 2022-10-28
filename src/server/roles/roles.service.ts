import {BadRequestException, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Role} from '../entities'
import {FindMany, FindOne, OneOrMany, RequiredFields, UnmutableFields,} from 'src/shared/types/database.type'
import {Repository} from 'typeorm'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
  ) {
  }

  async create(roleDto: RequiredFields<Role, 'name'>) {
    const variant = await this.rolesRepo.findOne({
      where: {
        name: roleDto.name.toUpperCase(),
      },
    })
    if (variant)
      throw new BadRequestException('Role with this name already exists')
    const basicRole = await this.getBasicRole()
    const role = new Role(roleDto)
    role.priority = basicRole.priority
    await this.rolesRepo.update(
      {id: basicRole.id},
      {priority: basicRole.priority + 1},
    )
    return await this.rolesRepo.save(role)
  }

  async findOne(findData: FindOne<Role>) {
    return await this.rolesRepo.findOneOrFail({where: findData})
  }

  async find(findData: FindMany<Role>) {
    return await this.rolesRepo.find({
      ...findData,
      order: {priority: 'ASC'},
    })
  }

  async update(id: string, opts: UnmutableFields<Role, 'id'>) {
    return await this.rolesRepo.update({id}, opts)
  }

  async delete(roles: OneOrMany<Role>) {
    const variants: Role[] = []
    if (Array.isArray(roles)) {
      variants.push(...roles)
    } else {
      variants.push(roles)
    }
    return await this.rolesRepo.softRemove(variants)
  }

  async createRootRole() {
    const variant = await this.rolesRepo.findOne({
      where: {name: 'root'.toUpperCase()},
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
    console.log('root role created')
    return await this.rolesRepo.save(rootRole)
  }

  async createBasicRole() {
    const variant = await this.rolesRepo.findOne({
      where: {name: 'basic'.toUpperCase()},
    })
    if (variant) return variant
    const minPriority = await this.findMinPriority()
    const basicRole = new Role({
      name: 'basic',
      priority: minPriority === 0 ? 1 : minPriority,
      canAddBookings: true,
      canDeleteBookings: true,
    })
    return await this.rolesRepo.save(basicRole)
  }

  async findMinPriority() {
    const minRole = await this.rolesRepo.findOne({
      where: {},
      order: {priority: 'DESC'},
    })
    return minRole ? minRole.priority : 1
  }

  async findMaxPriority() {
    const maxRole = await this.rolesRepo.findOne({
      where: {},
      order: {priority: 'ASC'},
    })
    return maxRole ? maxRole.priority : 0
  }

  async getRootRole() {
    return await this.rolesRepo.findOneOrFail({
      where: {name: 'root'.toUpperCase()},
    })
  }

  async getBasicRole() {
    return await this.rolesRepo.findOneOrFail({
      where: {name: 'basic'.toUpperCase()},
    })
  }
}
