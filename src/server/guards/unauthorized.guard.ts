import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthorizeStrategy } from './../auth/authorize.strategy'

@Injectable()
export class UnauthorizedGuard extends AuthGuard(AuthorizeStrategy.key) {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean
    return result
  }
  handleRequest(err, user, _info) {
    if (err || user) {
      throw err || new ForbiddenException()
    }
    return user
  }
}
