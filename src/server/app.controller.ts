import { Controller, Get, Render, Param } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from './users/users.service'

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  // @Render('index')
  home() {
    return this.jwtService.sign({ qwe: 123 })
  }

  @Get('/:abc')
  @Render('Qwe')
  qwe(@Param('abc') param: string) {
    return {
      title: param,
    }
  }
}
