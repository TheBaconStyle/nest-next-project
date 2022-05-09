import { Controller, Get, Render, Param, Post, Body } from '@nestjs/common'

import { UsersService } from './users/users.service'

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Render('index')
  home() {
    return {}
  }

  @Get('/:abc')
  @Render('Qwe')
  qwe(@Param('abc') param: string) {
    return {
      title: param,
    }
  }
}
