import { FindRoleDto } from './dto/find-role.dto'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './entities/roles.entity'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly RoleRepo: Repository<Role>,
  ) {}

  async create(roleDto: CreateRoleDto) {
    const role = new Role(roleDto)
    return await this.RoleRepo.save(role)
  }

  async findOne(name: string) {
    return await this.RoleRepo.findOne({ where: { name } })
  }

  async find(roleDtos: FindRoleDto[]) {
    return await this.RoleRepo.find({ where: roleDtos })
  }

  async delete(roles: Role[]) {
    return await this.RoleRepo.softRemove(roles)
  }

  async update(name: string, opts) {
    return await this.RoleRepo.createQueryBuilder('role')
      .update()
      .where('role.name = :name', { name })
      .set(opts)
      .execute()
      .then((res) => res)
      .catch(() => {
        throw new InternalServerErrorException({
          message: 'oops! smth gone wrong',
        })
      })
  }

  async createRootRole() {
    const variant = await this.RoleRepo.findOne({ priority: 0 })
    if (variant) return variant
    const rootRole = new Role()
    rootRole.name = 'root'
    rootRole.priority = 0
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
    return await this.RoleRepo.save(rootRole)
  }
}
