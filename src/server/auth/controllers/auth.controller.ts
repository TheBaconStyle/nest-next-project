import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { IReqFingerprint } from '../../shared/types/req-fingerprint.type'
import { UnautnenticatedGuard } from '../guards/unauthenticated.guard'
import { AuthorizedGuard } from './../guards/authorize.guard'

@Controller('auth')
@ApiExcludeController()
export class AuthController {
  @Get('signin')
  @UseGuards(UnautnenticatedGuard)
  signInPage(@Req() req: IReqFingerprint) {
    return req.fingerprint
  }

  @Get('signup')
  @UseGuards(UnautnenticatedGuard)
  signUpPage() {
    return 'SignUpPage'
  }

  @Get('/')
  @UseGuards(AuthorizedGuard)
  async qwe(@Req() req: IReqFingerprint) {
    const userAgent = req.fingerprint.components.useragent
    return `U send request from ${userAgent.browser.family} on ${userAgent.os.family} ${req.fingerprint.hash}`
  }
}
