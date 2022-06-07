import { FindUserDto } from 'src/server/auth/dto/find-user.dto'
import { RegisterDto } from '../dto/register-user.dto'
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

  async create(registerUserDto: RegisterDto) {
    const user = new User(registerUserDto)
    return await this.UserRepo.save(user)
  }

  async findOne(whereConditions: FindUserDto) {
    const user = await this.UserRepo.findOne({
      where: whereConditions,
      relations: ['roles'],
    })
    return user
  }

  async find(whereConditions: FindUserDto[]) {
    return await this.UserRepo.find({
      where: whereConditions,
      relations: ['roles'],
    })
  }

  async delete(whereConditions: FindUserDto) {
    return await this.UserRepo.delete(whereConditions)
  }
}
