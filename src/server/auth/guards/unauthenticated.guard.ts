import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { User } from '../../users/entities/users.entity'
import { AUTHORIZE } from './../shared/auth.constants'

@Injectable()
export class UnautnenticatedGuard extends AuthGuard(AUTHORIZE) {
  constructor() {
    super()
  }

  handleRequest<TUser = User>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
  ) {
    const res: Response = context.switchToHttp().getResponse()
    if (user) {
      return res.redirect('/')
    }
    return user
  }
}
