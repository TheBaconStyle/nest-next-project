import {
  Controller,
  Get,
  Render,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AppController {
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
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Req() req) {
    return req.user
  }
}
