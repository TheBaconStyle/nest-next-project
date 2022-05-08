import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDTO, CheckUserExistDTO } from './users.dto'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async create({ email, login, password }: CreateUserDTO) {
    const user = new User()
    user.email = email
    user.login = login
    user.password = password
    return await this.UserRepo.save(user)
  }

  async findByData({ email, login }: CheckUserExistDTO) {
    return await this.UserRepo.findOne({
      where: [
        { login, blocked: false },
        { email, blocked: false },
      ],
    })
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({ where: { email } })
  }
}
