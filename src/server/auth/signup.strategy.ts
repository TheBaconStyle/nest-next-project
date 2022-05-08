import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import session from 'express-session'
import { Strategy } from 'passport-local'
import { CreateUserDTO } from '../users/users.dto'
import { AUTH_SIGNUP } from './auth.constants'
import { AuthService } from './auth.service'

@Injectable()
export class SignUpStrategy extends PassportStrategy(Strategy, AUTH_SIGNUP) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true, session: true, usernameField: 'email' })
  }

  async validate(req: Request<any, any, CreateUserDTO>) {
    const user = this.authService.registerUser(req.body)

    if (!user) {
      throw new BadRequestException({
        message: 'User with this login or email already exists',
      })
    }
    return user
  }
}
