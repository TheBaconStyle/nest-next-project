import type { IReqFingerprint } from './../../shared/types/index'
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RegisterDto } from '../dto/register-user.dto'
import { SignInDto } from '../dto/signin-user.dto'
import { AuthorizeGuard } from './../guards/authorize.guard'
import { AuthService } from './../services/auth.service'

@Controller('/api/auth')
@ApiTags('auth')
export class AuthAPIController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({
    type: RegisterDto,
    examples: {
      a: {
        value: {
          email: 'example@example.example',
          login: 'example',
          password: 'exampleSecret',
        } as RegisterDto,
      },
    },
  })
  @ApiOperation({ description: 'Registration endpoint' })
  @ApiResponse({ status: 200, description: 'Successful registration' })
  @ApiResponse({
    status: 400,
    description:
      'Not enough data fro registration or user with this login/email already exists',
  })
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

  @Delete('signout')
  @UseGuards(AuthorizeGuard)
  async signout(@Req() req: IReqFingerprint) {
    await this.authService.deauthenticateUser(req.fingerprint.hash)
    return 'Signed out'
  }

  @Get()
  @UseGuards(AuthorizeGuard)
  async check() {
    return `OK`
  }
}
