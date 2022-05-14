import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AUTHORIZE } from '../shared/auth.constants'

@Injectable()
export class AuthorizeGuard extends AuthGuard(AUTHORIZE) {}
