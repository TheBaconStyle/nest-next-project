import { AuthPageProps } from '../../shared/types/auth.types'
import { FingerprintRequest } from './../../shared/types/request.type'
import { AuthService } from './auth.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common'
import { RegisterDto } from '../dto/register-user.dto'
import { SignInDto } from '../dto/signin-user.dto'
import { AuthorizeGuard } from '../guards/authorize.guard'
import { ApiTags } from '@nestjs/swagger'
import { UnauthenticatedGuard } from '../guards/unauthenticated.guard'
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async rigisterUser(@Body() userDto: RegisterDto) {
    await this.authService.registerUser(userDto)
    return 'Registered successfully'
  }

  @Post('signin')
  async authenticateUser(
    @Req() req: FingerprintRequest,
    @Body() userDto: SignInDto,
  ) {
    await this.authService.authenticateUser(userDto, req.fingerprint)
    return 'Signed in'
  }

  @Delete('signout')
  @UseGuards(AuthorizeGuard)
  async signout(@Req() req: FingerprintRequest) {
    await this.authService.deauthenticateUser(req.fingerprint.hash)
    return 'Signed out'
  }

  @UseGuards(AuthorizeGuard)
  @Get('/')
  async qwe(@Req() req: FingerprintRequest) {
    const userAgent = req.fingerprint.components.useragent
    return `U send request from ${userAgent.browser.family} on ${userAgent.os.family} ${req.fingerprint.hash}`
  }

  @Render('Auth')
  @UseGuards(UnauthenticatedGuard)
  @Get('signin')
  async signInPage(): Promise<AuthPageProps> {
    return {
      type: 'auth',
    }
  }

  @Render('Auth')
  @UseGuards(UnauthenticatedGuard)
  @Get('signup')
  async signUpPage(): Promise<AuthPageProps> {
    return {
      type: 'register',
    }
  }
}
