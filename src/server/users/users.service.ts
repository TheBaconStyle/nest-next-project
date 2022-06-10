import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindUserDto } from 'src/server/users/dto/find-user.dto'
import { Repository } from 'typeorm'
import { RegisterDto } from '../auth/dto/register-user.dto'
import { User } from './entities/users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
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
