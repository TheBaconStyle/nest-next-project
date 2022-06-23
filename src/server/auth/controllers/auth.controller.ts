import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { IReqFingerprint } from '../../shared/types/req-fingerprint.interface'
import { UnautnenticatedGuard } from '../guards/unauthenticated.guard'
import { AuthorizeGuard } from './../guards/authorize.guard'

@Controller('auth')
@ApiExcludeController()
export class AuthController {
  @Get('signin')
  @UseGuards(UnautnenticatedGuard)
  async signInPage(@Req() req: IReqFingerprint) {
    return req.fingerprint
  }

  @Get('signup')
  @UseGuards(UnautnenticatedGuard)
  async signUpPage() {
    return 'SignUpPage'
  }

  @Get('/')
  @UseGuards(AuthorizeGuard)
  async qwe(@Req() req: IReqFingerprint) {
    const userAgent = req.fingerprint.components.useragent
    return `U send request from ${userAgent.browser.family} on ${userAgent.os.family} ${req.fingerprint.hash}`
  }
}
