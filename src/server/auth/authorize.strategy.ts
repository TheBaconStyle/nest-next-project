import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { AUTHORIZE } from './strategy.keys'

@Injectable()
export class AuthorizeStrategy extends PassportStrategy(Strategy, AUTHORIZE) {
  static key = AUTHORIZE
  async validate(req: Request) {
    const isValid = req.isAuthenticated()
    if (!isValid) {
      throw new UnauthorizedException()
    }
    return req.user
  }
}
