import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'

import { CreateUserDTO, ValidateUserDTO } from '../users/users.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async registerUser(newUserData: CreateUserDTO) {
    const candidate = await this.usersService.findByData(newUserData)
    if (!candidate) {
      const { password, blocked, ...userData } = await this.usersService.create(
        newUserData,
      )
      return userData
    }
    return null
  }

  async validateUser({ email, password }: ValidateUserDTO) {
    const candidate = await this.usersService.findByEmail(email)
    if (candidate && (await compare(password, candidate.password))) {
      const { password, blocked, ...userData } = candidate
      return userData
    }
    return null
  }
}
