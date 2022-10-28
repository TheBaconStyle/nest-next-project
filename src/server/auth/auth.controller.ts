import {SignInDto} from './dto/signin-user.dto'
import {Body, Controller, Get, Post, UseFilters, UseGuards,} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {CurrentUser} from '../decorators/request-user.decorator'
import {User} from 'src/server/entities'
import {AuthService} from './auth.service'
import {RegisterDto} from './dto/signup-user.dto'
import {AuthenticateGuard} from './guards/authenticate.guard'
import {AuthorizeGuard} from './guards/authorize.guard'
import {BasicFilter} from '../filters/basic.filter'

@ApiTags('auth')
@UseFilters(BasicFilter)
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('signup')
  async rigisterUser(@Body() userDto: RegisterDto) {
    await this.authService.registerUser(userDto)
    return {message: 'Registered successfully'}
  }

  @UseGuards(AuthenticateGuard)
  @Post('signin')
  async authenticateUser(@Body() body: SignInDto) {
    return {message: 'Signed in'}
  }

  @UseGuards(AuthorizeGuard)
  @Get()
  async qwe(@CurrentUser() user: User) {
    return {user: user.login}
  }
}
