import { ForbiddenException } from '@nestjs/common'
import { havePermissions } from '../utils/identify-permissions.helper'

export function ProtectDocs(req, res, next) {
  if (req.user && havePermissions(req.user, { haveDocsAccess: true }))
    return next()
  return next(new ForbiddenException())
}
