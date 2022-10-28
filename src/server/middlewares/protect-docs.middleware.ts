import {ForbiddenException, Injectable, NestMiddleware} from '@nestjs/common'
import {Request} from 'express'
import {havePermissions} from '../auth/guards/permission.guard'

@Injectable()
export class ProtectDocsMiddleware implements NestMiddleware {
  async use(req: Request, _res: any, next: () => void) {
    if (await havePermissions(req.user, ['haveDocsAccess'])) return next()
    throw new ForbiddenException()
  }
}
