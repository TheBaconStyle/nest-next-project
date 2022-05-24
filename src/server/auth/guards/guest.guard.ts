import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class GuestOnlyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const res = ctx.getResponse()
    if (req.user) {
      return res.redirect('/')
    }
  }
}
