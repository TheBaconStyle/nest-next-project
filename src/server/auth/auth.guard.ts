import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class LocalAuthGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    if (request.user) {
      return true
    }
    throw new UnauthorizedException({ message: 'User is not authorized' })
  }
}
