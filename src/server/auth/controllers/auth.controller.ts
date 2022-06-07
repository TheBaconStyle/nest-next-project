import { AuthorizeGuard } from './../guards/authorize.guard'
import { Controller, Get, Headers, Req, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { IReqFingerprint } from '../../shared/types/req-fingerprint.type'
import { UnautnenticatedGuard } from '../guards/unauthenticated.guard'

@Controller('auth')
@ApiExcludeController()
export class AuthController {
  @Get('signin')
  @UseGuards(UnautnenticatedGuard)
  signInPage(@Headers('user-agent') userAgent: string) {
    return userAgent
  }

  @Get('signup')
  @UseGuards(UnautnenticatedGuard)
  signUpPage() {
    return 'SignUpPage'
  }

  @Get('/')
  @UseGuards(AuthorizeGuard)
  async qwe(@Req() req: IReqFingerprint) {
    const userAgent = req.fingerprint.components.useragent
    return `U send request from ${userAgent.browser.family} on ${userAgent.os.family} ${req.fingerprint.hash}`
  }
}
