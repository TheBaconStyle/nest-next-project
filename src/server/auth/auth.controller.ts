// import { ConfigService } from '@nestjs/config'
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { SignInGuard } from './signin.guard'
import { SignUpGuard } from './signup.guard'

@Controller('auth')
export class AuthController {
  @Post('signup')
  @UseGuards(SignUpGuard)
  signUp(@Request() req) {
    return req.user
  }

  @Post('signin')
  @UseGuards(SignInGuard)
  signIn(@Request() req) {
    return req.user
  }

  @Get('signin')
  signInPage() {
    return 'SignInPage'
  }
  @Get('signup')
  signUpPage() {
    return 'SignUpPage'
  }
  @Get('qwe')
  qwe() {
    return process.env.PORT
  }
}
