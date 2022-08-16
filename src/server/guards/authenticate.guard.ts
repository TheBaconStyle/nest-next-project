import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthenticateStrategy } from '../auth/authenticate.strategy'

@Injectable()
export class AuthenticateGuard extends AuthGuard(AuthenticateStrategy.key) {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()
    await super.logIn(request)
    return result
  }
}
