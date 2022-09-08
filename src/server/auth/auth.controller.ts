import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthPageProps } from '../../shared/types/auth.types'
import { CurrentUser } from '../decorators/request-user.decorator'
import { User } from '../entities/users.entity'
import { FingerprintRequest } from './../../shared/types/request.type'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/signup-user.dto'
import { AuthenticateGuard } from './guards/authenticate.guard'
import { AuthorizeGuard } from './guards/authorize.guard'
import { UnauthorizedGuard } from './guards/unauthorized.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/signup')
  async rigisterUser(@Body() userDto: RegisterDto) {
    await this.authService.registerUser(userDto)
    return { message: 'Registered successfully' }
  }

  @UseGuards(AuthenticateGuard)
  @Post('api/signin')
  async authenticateUser() {
    return { message: 'Signed in' }
  }

  @UseGuards(AuthorizeGuard)
  @Get('api/signout')
  async signout(@Session() session, @Res() res: Response) {
    session.destroy()
    return res.redirect('/')
  }

  @UseGuards(AuthorizeGuard)
  @Get('/api')
  async qwe(@CurrentUser() user: User) {
    return { user: user.login }
  }

  @ApiExcludeEndpoint()
  @Render('auth')
  @UseGuards(UnauthorizedGuard)
  @Get('signin')
  async signInPage(): Promise<AuthPageProps> {
    return {
      type: 'auth',
    }
  }

  @ApiExcludeEndpoint()
  @Render('auth')
  @UseGuards(UnauthorizedGuard)
  @Get('signup')
  async signUpPage(): Promise<AuthPageProps> {
    return {
      type: 'register',
    }
  }
}
