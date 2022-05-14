import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { User } from '../../users/entities/users.entity'
import { AuthService } from '../services/auth.service'
import { AUTHENTICATE } from '../shared/auth.constants'

@Injectable()
export class AuthenticateStrategy extends PassportStrategy(
  Strategy,
  AUTHENTICATE,
) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(req: Request<any, any, User>) {
    const tokens = await this.authService
      .authenticateUser(req.body)
      .catch(() => false)
    if (tokens) return tokens
    throw new UnauthorizedException({
      message: 'Oops! Your email/password is incorrect',
    })
  }
}
