import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
<<<<<<< HEAD
import { AuthService } from '../services/auth.service'
import { AUTHORIZE } from './../shared/auth.constants'
=======
import { AuthService } from '../auth.service'
import { AUTHORIZE } from '../shared/auth.constants'
>>>>>>> master

@Injectable()
export class AuthorizeStrategy extends PassportStrategy(Strategy, AUTHORIZE) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(req: Request) {
<<<<<<< HEAD
    const authorizedUser = await this.authService
      .authorizeUser(req.headers.authorization.split(' ')[1])
      .catch(() => false)
    if (authorizedUser) return authorizedUser
    throw new UnauthorizedException({ message: 'dwadwadwad' }, '1')
=======
    try {
      const token = req.headers.authorization.split(' ')[1]
      return await this.authService.authorizeUser(token)
    } catch {
      throw new UnauthorizedException('Token is not valid.')
    }
>>>>>>> master
  }
}
