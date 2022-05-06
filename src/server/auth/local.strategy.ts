import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../user/users.model'

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }
  async validate(
    username: string,
    password: string,
  ): Promise<User | UnauthorizedException> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      return new UnauthorizedException()
    }
    return user
  }
}
