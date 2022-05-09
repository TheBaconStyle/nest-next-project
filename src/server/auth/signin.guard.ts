import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AUTH_SIGNIN } from './auth.constants'

@Injectable()
export class SignInGuard extends AuthGuard(AUTH_SIGNIN) {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean
    if (result) {
      const request = context.switchToHttp().getRequest()
      await super.logIn(request)
    }
    return result
  }
}
