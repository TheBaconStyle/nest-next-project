import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom'
import { AuthService } from '../services/auth.service'
import { AUTHORIZE } from '../shared/auth.constants'
import { IReqFingerprint } from '../../shared/types/req-fingerprint.interface'

@Injectable()
export class AuthorizeStrategy extends PassportStrategy(Strategy, AUTHORIZE) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(req: IReqFingerprint) {
    return await this.authService.authorizeUser(req.fingerprint.hash)
  }
}
