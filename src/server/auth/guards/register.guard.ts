import { REGISTER } from '../shared/auth.constants'
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class RegisterGuard extends AuthGuard(REGISTER) {}
