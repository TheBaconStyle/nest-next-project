import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-custom'
import { User } from '../../users/entities/users.entity'
import { AuthService } from '../services/auth.service'
import { REGISTER } from '../shared/auth.constants'

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, REGISTER) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(req: Request<any, any, User>) {
    const registeredUser = await this.authService
      .registerUser(req.body)
      .catch(() => false)
    if (registeredUser) return registeredUser
    throw new BadRequestException({
      message: 'User with this login or email already exists',
    })
  }
}
