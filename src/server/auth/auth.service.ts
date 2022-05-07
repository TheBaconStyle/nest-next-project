import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'
import { User } from '../user/users.entity'
import { UsersService } from '../user/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const candidate = await this.usersService.findByUsername(username)
    if (candidate && (await compare(password, candidate.password))) {
      const { password, ...rest } = candidate
      return rest
    }
    return null
  }
}
