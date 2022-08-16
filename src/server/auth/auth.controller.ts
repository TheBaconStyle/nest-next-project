import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Render,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { AuthPageProps } from '../../shared/types/auth.types'
import { RegisterDto } from '../dto/register-user.dto'
import { AuthenticateGuard } from '../guards/authenticate.guard'
import { AuthorizeGuard } from '../guards/authorize.guard'
import { FingerprintRequest } from './../../shared/types/request.type'
import { UnauthorizedGuard } from './../guards/unauthorized.guard'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async rigisterUser(@Body() userDto: RegisterDto) {
    await this.authService.registerUser(userDto)
    return 'Registered successfully'
  }

  @UseGuards(AuthenticateGuard)
  @Post('api/signin')
  async authenticateUser() {
    return 'Signed in'
  }

  @UseGuards(AuthorizeGuard)
  @Delete('api/signout')
  async signout(@Session() session) {
    session.destroy()
    return 'Signed out'
  }

  @UseGuards(AuthorizeGuard)
  @Get('/')
  async qwe(@Req() req: FingerprintRequest) {
    return 'OK'
  }

  @ApiExcludeEndpoint()
  @Render('Auth')
  @UseGuards(UnauthorizedGuard)
  @Get('signin')
  async signInPage(): Promise<AuthPageProps> {
    return {
      type: 'auth',
    }
  }

  @ApiExcludeEndpoint()
  @Render('Auth')
  @UseGuards(UnauthorizedGuard)
  @Get('signup')
  async signUpPage(): Promise<AuthPageProps> {
    return {
      type: 'register',
    }
  }
}
