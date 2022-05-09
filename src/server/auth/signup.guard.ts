import { AUTH_SIGNUP } from './auth.constants'
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class SignUpGuard extends AuthGuard(AUTH_SIGNUP) {}
