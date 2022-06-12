import { Controller, Get, Post, Render, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { AuthorizedGuard } from './auth/guards/authorize.guard'

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Render('index')
  async home() {
    return {}
  }

  @Get('account')
  @UseGuards(AuthorizedGuard)
  @Render('account')
  protectedRoute() {
    return 'udhaiuhwdhadhwa'
  }
}
