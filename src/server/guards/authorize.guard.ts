import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthorizeStrategy } from './../auth/authorize.strategy'

@Injectable()
// export class AuthorizeGuard implements CanActivate {
//   constructor(@Inject(AuthService) private readonly authService: AuthService) {}
//   async canActivate(context: ExecutionContext) {
//     const req = context.switchToHttp().getRequest() as FingerprintRequest
//     const { hash } = req.fingerprint
//     const user = await this.authService.authorizeUser(hash)
//     Object.assign(req, { user })
//     return true
//   }
// }
export class AuthorizeGuard extends AuthGuard(AuthorizeStrategy.key) {}
