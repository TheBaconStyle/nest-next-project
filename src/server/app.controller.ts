import { Controller, Get, Render, Param, Post, Body } from '@nestjs/common'
import { UserService } from './user/users.service'

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

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

  @Post('/user')
  async createUser(@Body() body) {
    return await this.userService.create(body)
  }
}
