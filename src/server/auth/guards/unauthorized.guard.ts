import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class UnauthorizedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request
    if (!req.isAuthenticated()) {
      return true
    }
    throw new NotFoundException()
  }
}
