import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { AuthService } from 'src/server/auth/auth.service'
import { SignInDto } from './../dto/signin-user.dto'
import { AUTHENTICATE } from './strategy.keys'

@Injectable()
export class AuthenticateStrategy extends PassportStrategy(
  Strategy,
  AUTHENTICATE,
) {
  constructor(private readonly authService: AuthService) {
    super()
  }
  static key = AUTHENTICATE
  async validate(req: Request<any, any, SignInDto>) {
    const user = await this.authService.authenticateUser(req.body)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
