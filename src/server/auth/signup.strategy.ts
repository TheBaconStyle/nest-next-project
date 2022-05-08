import { CreateUserDTO } from '../users/users.dto'
import { AUTH_SIGNUP } from './auth.constants'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-local'

import { AuthService } from './auth.service'

@Injectable()
export class SignUpStrategy extends PassportStrategy(Strategy, AUTH_SIGNUP) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true, session: true, usernameField: 'email' })
  }

  async validate(req: Request<any, any, CreateUserDTO>): Promise<any> {
    this.authService.registerUser(req.body)
    return undefined
  }
}
