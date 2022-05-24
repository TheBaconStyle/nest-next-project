import { AuthService } from './../auth.service'
import { Request, Response } from 'express'
import { User } from './../../users/entities/users.entity'
import { AuthGuard } from '@nestjs/passport'
import { AUTHORIZE } from './../shared/auth.constants'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class UnautnenticatedGuard extends AuthGuard(AUTHORIZE) {
  constructor(private readonly authService: AuthService) {
    super()
  }
  handleRequest<TUser = User>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
  ) {
    const ctx = context.switchToHttp()
    const req: Request = ctx.getRequest()
    const res: Response = ctx.getResponse()
    const token = req.signedCookies.token
    if (this.authService.checkRefreshToken(token)) {
      return res.redirect('/')
    }
    return user
  }
}
