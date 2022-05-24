import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { AuthService } from '../auth.service'
import { AUTHORIZE } from '../shared/auth.constants'

@Injectable()
export class AuthorizeStrategy extends PassportStrategy(Strategy, AUTHORIZE) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(req: Request) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      return await this.authService.authorizeUser(token)
    } catch {
      throw new UnauthorizedException('Token is not valid.')
    }
  }
}
