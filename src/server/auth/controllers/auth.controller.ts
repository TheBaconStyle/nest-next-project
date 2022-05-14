import { UsersService } from './../../users/services/users.service'
import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import ms from 'ms'
import { AuthenticateGuard } from '../guards/authenticate.guard'
import { RegisterGuard } from '../guards/register.guard'
import { Role } from './../../users/entities/roles.entity'
import { AuthorizeGuard } from './../guards/authorize.guard'
import { AuthService } from '../services/auth.service'
import { RoleGuard } from '../guards/role.guard'

interface SignInRequestMixin {
  user: {
    accessToken?: string
    refreshToken?: string
  }
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @UseGuards(RegisterGuard)
  rigisterUser() {
    return { message: 'Registered successfully!' }
  }

  @Post('signin')
  @UseGuards(AuthenticateGuard)
  authenticateUser(
    @Req() req: Request & SignInRequestMixin,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = req.user
    res.cookie('token', refreshToken, {
      httpOnly: true,
      maxAge: ms('30d'),
      sameSite: true,
      signed: true,
    })
    return { token: accessToken }
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshUser(
      req.signedCookies.token,
    )
    res.cookie('token', refreshToken, {
      httpOnly: true,
      maxAge: ms('30d'),
      sameSite: true,
      signed: true,
    })
    return { token: accessToken }
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
  @UseGuards(AuthorizeGuard, RoleGuard('ADMIN'))
  @Render('account')
  protectedRoute() {
    return 'udhaiuhwdhadhwa'
  }

  @Post('role')
  async createRole(@Body() body: Role) {
    return await this.userService.createRole(body)
  }
}
