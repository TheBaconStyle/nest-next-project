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
    const role = new Role()
    role.name = roleDto.name
    return await this.RoleRepo.save(role)
  }

  async findOne(name: string) {
    return await this.RoleRepo.findOne({ where: { name } })
  }

  async find(roleDtos: FindRoleDto[]) {
    return await this.RoleRepo.find({ where: roleDtos })
  }

  async delete(name: string) {
    return await this.RoleRepo.createQueryBuilder('role')
      .delete()
      .where('roel.name  = :name', { name })
      .execute()
      .then((res) => res)
      .catch(() => {
        throw new InternalServerErrorException({
          message: 'oops!  smth gone wrong',
        })
      })
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
}
