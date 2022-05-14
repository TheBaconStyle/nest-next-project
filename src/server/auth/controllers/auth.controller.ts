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
import { UsersService } from 'src/server/users/services/users.service'
import { AuthenticateGuard } from '../guards/authenticate.guard'
import { RegisterGuard } from '../guards/register.guard'
import { Role } from './../../users/entities/roles.entity'
import { AuthorizeGuard } from './../guards/authorize.guard'

interface SignInRequestMixin {
  user: {
    accessToken?: string
    refreshToken?: string
  }
}

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  @UseGuards(RegisterGuard)
  rigisterUser() {
    return 'Registered successfully!'
  }

  @Post('signin')
  @UseGuards(AuthenticateGuard)
  authenticateUser(
    @Req() req: Request & SignInRequestMixin,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = req.user
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms('30d') / 1000,
      sameSite: true,
      signed: true,
    })
    return { accessToken }
  }

  @Post('refresh')
  refresh() {
    return 'refreshed'
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
  @UseGuards(AuthorizeGuard)
  @Render('account')
  protectedRoute() {
    // return process.env.PORT
    return 'udhaiuhwdhadhwa'
  }

  @Post('role')
  createRole(@Body() body: Role) {
    return this.usersService.createRole(body)
  }
}
