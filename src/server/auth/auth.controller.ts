import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AUTH_SIGNIN, AUTH_SIGNUP } from './auth.constants'

@Controller('auth')
export class AuthController {
  @Post('signup')
  @UseGuards(AuthGuard(AUTH_SIGNUP))
  signUp(@Request() req) {
    return req.user
  }

  @Post('signin')
  @UseGuards(AuthGuard(AUTH_SIGNIN))
  signIn(@Request() req) {
    return req.user
  }
}
