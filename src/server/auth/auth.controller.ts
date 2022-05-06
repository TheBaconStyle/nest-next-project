import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

interface logInData {
  username: string
  password: string
}
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  logIn(@Body() body: logInData) {
    return { message: 'qwe' }
  }
}
