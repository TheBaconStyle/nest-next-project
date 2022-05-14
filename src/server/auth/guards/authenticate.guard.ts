import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AUTHENTICATE } from '../shared/auth.constants'

@Injectable()
export class AuthenticateGuard extends AuthGuard(AUTHENTICATE) {}
