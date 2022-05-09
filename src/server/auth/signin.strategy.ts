import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { ValidateUserDTO } from '../users/users.dto'
import { AUTH_SIGNIN } from './auth.constants'
import { AuthService } from './auth.service'

@Injectable()
export class SignInStrategy extends PassportStrategy(Strategy, AUTH_SIGNIN) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(req: Request<any, any, ValidateUserDTO>) {
    const user = await this.authService.validateUser(req.body)

    if (!user) {
      throw new UnauthorizedException({
        message: 'Oops! Your email/password is incorrect',
      })
    }

    return user
  }
}
