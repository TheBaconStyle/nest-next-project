import {
  Controller,
  Get,
  Render,
  Param,
  Post,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
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
  // @UseGuards(AuthGuard('local'))
  // @Post('/auth/login')
  // async login(@Req() req) {
  //   return req.user
  // }
  @Post('/user')
  async createUser(@Body() body) {
    return await this.userService.create(body)
  }
}
