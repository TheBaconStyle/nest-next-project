import { UnautnenticatedGuard } from './guards/unauthenticated.guard'
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import ms from 'ms'
import { RegisterUserDto } from './dto/register.dto'
import { CreateRoleDto } from '../roles/dto/create.dto'
import { ReqUser } from '../shared/decorators/user.decorator'
import { LoginUserDto } from './dto/signin.dto'
import { User } from './../users/entities/users.entity'
import { AuthService } from './auth.service'
import { AuthorizeGuard } from './guards/authorize.guard'
import { RoleGuard } from './guards/role.guard'

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async rigisterUser(@Body() userDto: RegisterUserDto) {
    return await this.authService.registerUser(userDto).then(() => ({
      message: 'Registered successfully',
    }))
  }

  @Post('signin')
  async authenticateUser(
    @Res({ passthrough: true }) res: Response,
    @Body() userDto: LoginUserDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.authenticateUser(userDto)
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
  @UseGuards(UnautnenticatedGuard)
  @ApiExcludeEndpoint()
  signInPage(@Headers('user-agent') userAgent: string) {
    return 'SignInPage'
  }

  @Get('signup')
  @ApiExcludeEndpoint()
  signUpPage() {
    return 'SignUpPage'
  }

  @Get('qwe')
  @ApiExcludeEndpoint()
  @UseGuards(AuthorizeGuard)
  @Render('account')
  protectedRoute() {
    return 'udhaiuhwdhadhwa'
  }

  @Post('role')
  @ApiBearerAuth()
  @UseGuards(AuthorizeGuard, RoleGuard('ADMIN'))
  async createRole(@Body() roleDto: CreateRoleDto) {
    return await this.authService.createRole(roleDto).then(() => ({
      message: 'Role created',
    }))
  }
}
