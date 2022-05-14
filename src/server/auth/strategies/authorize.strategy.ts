import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { AuthService } from '../services/auth.service'
import { AUTHORIZE } from './../shared/auth.constants'

@Injectable()
export class AuthorizeStrategy extends PassportStrategy(Strategy, AUTHORIZE) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(req: Request) {
    const authorizedUser = await this.authService
      .authorizeUser(req.headers.authorization.split(' ')[1])
      .catch(() => false)
    if (authorizedUser) return authorizedUser
    throw new UnauthorizedException({ message: 'dwadwadwad' }, '1')
  }
}
