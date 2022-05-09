import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { CreateUserDTO } from '../users/users.dto'
import { AUTH_SIGNUP } from './auth.constants'
import { AuthService } from './auth.service'

@Injectable()
export class SignUpStrategy extends PassportStrategy(Strategy, AUTH_SIGNUP) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(req: Request<any, any, CreateUserDTO>) {
    const user = await this.authService.registerUser(req.body)

    if (!user) {
      throw new BadRequestException({
        message: 'User with this login or email already exists',
      })
    }
    return user
  }
}
