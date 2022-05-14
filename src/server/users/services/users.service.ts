import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '../entities/roles.entity'
import { User } from '../entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    @InjectRepository(Role) private readonly RoleRepo: Repository<Role>,
  ) {}

  async create({ email, login, password, roles = [] }: User) {
    const user = new User()
    user.email = email
    user.login = login
    user.password = password
    if (roles.length !== 0) {
      const roleNames = roles.map((role) => ({
        name: role,
      }))
      const userRoles = await this.RoleRepo.find({ where: roleNames })
      user.roles = userRoles
    }
    return await this.UserRepo.save(user)
  }

  async findByData({ email, login }: User) {
    return await this.UserRepo.findOne({
      where: [
        { login, blocked: false },
        { email, blocked: false },
      ],
      relations: ['roles'],
    })
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({
      where: { email, blocked: false },
      relations: ['roles'],
    })
  }

  async findById(id: string) {
    return await this.UserRepo.findOne({
      where: { id, blocked: false },
      relations: ['roles'],
    })
  }

  async findByLogin(login: string) {
    return await this.UserRepo.findOne({
      // select:['email','id','login','password','roles.name']
      where: { login, blocked: false },
      relations: ['roles'],
    })
  }

  async createRole({ name }: Role) {
    const role = new Role()
    role.name = name
    return await this.RoleRepo.save(role)
  }

  async getRole(rolename: string) {
    return await this.RoleRepo.findOne({ where: { name: rolename } })
  }
}
