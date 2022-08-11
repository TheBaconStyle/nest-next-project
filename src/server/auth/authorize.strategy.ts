import { AuthService } from 'src/server/auth/auth.service'
import { FingerprintRequest } from './../../shared/types/request.type'
import { AUTHORIZE } from './strategy.keys'
import { Strategy } from 'passport-custom'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthorizeStrategy extends PassportStrategy(Strategy, AUTHORIZE) {
  constructor(private readonly authService: AuthService) {
    super()
  }
  static key = AUTHORIZE
  async validate(req: FingerprintRequest) {
    const isValid = await this.authService.authorizeUser(req.fingerprint.hash)
    return isValid
  }
}
