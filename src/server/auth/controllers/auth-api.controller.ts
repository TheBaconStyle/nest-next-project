import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RegisterDto } from '../dto/register-user.dto'
import { IReqFingerprint } from './../../shared/types/req-fingerprint.type'
import { SignInDto } from '../dto/signin-user.dto'
import { UnautnenticatedGuard } from './../guards/unauthenticated.guard'
import { AuthService } from './../services/auth.service'

@Controller('/api/auth')
@ApiTags('auth')
export class AuthAPIController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async rigisterUser(@Body() userDto: RegisterDto) {
    return await this.authService.registerUser(userDto).then(() => ({
      message: 'Registered successfully',
    }))
  }

  @Post('signin')
  async authenticateUser(
    @Req() req: IReqFingerprint,
    @Body() userDto: SignInDto,
  ) {
    await this.authService.authenticateUser(userDto, req.fingerprint)
    return 'Successfully signed in!'
  }

  @Post('signout')
  async singout(@Req() req: IReqFingerprint) {
    await this.authService.deauthenticateUser(req.fingerprint.hash)
    return 'Signed out'
  }

  @Get('check')
  @UseGuards(UnautnenticatedGuard)
  async check() {
    return 'OK'
  }
}
