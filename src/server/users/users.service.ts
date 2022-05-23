import { FindUserDto } from 'src/server/users/dto/find.dto'
import { RegisterUserDto } from './dto/register.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../roles/entities/roles.entity'
import { User } from './entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    @InjectRepository(Role) private readonly RoleRepo: Repository<Role>,
  ) {}

  async create({ email, login, password, roles = [] }: RegisterUserDto) {
    const user = new User()
    user.email = email
    user.login = login
    user.password = password
    if (roles && roles.length !== 0) {
      const roleNames = roles.map((role) => ({
        name: role,
      }))
      const userRoles = await this.RoleRepo.find({ where: roleNames })
      user.roles = userRoles
    }
    return await this.UserRepo.save(user)
  }

  async findOne(whereConds: FindUserDto[]) {
    const user = await this.UserRepo.findOne({
      where: whereConds,
      relations: ['roles'],
    })
    return user
  }

  async find(whereConds: FindUserDto[]) {
    return await this.UserRepo.find({
      where: whereConds,
      relations: ['roles'],
    })
  }

  async delete(whereConds: FindUserDto) {
    return undefined
  }
}
