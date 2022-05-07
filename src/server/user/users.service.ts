import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async create({ email, username, password }: User) {
    const user = new User()
    user.email = email
    user.username = username
    user.password = password
    return await this.UserRepo.save(user)
  }

  async findByUsername(username: string) {
    return await this.UserRepo.findOne({ where: { username } })
  }
}
