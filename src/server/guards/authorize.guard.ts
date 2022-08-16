import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthorizeStrategy } from './../auth/authorize.strategy'

@Injectable()
export class AuthorizeGuard extends AuthGuard(AuthorizeStrategy.key) {}
