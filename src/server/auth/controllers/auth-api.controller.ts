import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ReqUser } from 'src/server/shared/decorators/user-from-request.decorator'
import { User } from 'src/server/users/entities/users.entity'
import { IReqFingerprint } from '../../shared/types/req-fingerprint.interface'
import { RegisterDto } from '../dto/register-user.dto'
import { SignInDto } from '../dto/signin-user.dto'
import { AuthorizeGuard } from './../guards/authorize.guard'
import { AuthService } from './../services/auth.service'

@Controller('/api/auth')
@ApiTags('auth')
export class AuthAPIController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async rigisterUser(@Body() userDto: RegisterDto) {
    await this.authService.registerUser(userDto)
    return 'Registered successfully'
  }

  @Post('signin')
  async authenticateUser(
    @Req() req: IReqFingerprint,
    @Body() userDto: SignInDto,
  ) {
    await this.authService.authenticateUser(userDto, req.fingerprint)
    return 'Signed in'
  }

  @Post('signout')
  @UseGuards(AuthorizeGuard)
  async signout(@Req() req: IReqFingerprint) {
    await this.authService.deauthenticateUser(req.fingerprint.hash)
    return 'Signed out'
  }

  @Get()
  @UseGuards(AuthorizeGuard)
  async check(@ReqUser() user: User) {
    return `OK, ${user.roles}`
  }
}
