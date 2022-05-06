import { User } from './../user/users.model'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/users.service'
import { compare } from 'bcrypt'

const exceptionMessage = { message: 'oops username/login is incorrect' }
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async logIn(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username)
    if (!user) {
      throw new UnauthorizedException(exceptionMessage)
    }
    const isPasswordValid = compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException(exceptionMessage)
    }
    return user
  }
}
