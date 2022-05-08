import { AUTH_SIGNIN } from './auth.constants'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-local'

import { AuthService } from './auth.service'

@Injectable()
export class SignInStrategy extends PassportStrategy(Strategy, AUTH_SIGNIN) {
  constructor(private authService: AuthService) {
    super({ passReqToCallback: true, session: true, usernameField: 'email' })
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email, password })

    if (!user) {
      throw new UnauthorizedException({ message: 'Unauthorized' })
    }

    return user
  }
}
